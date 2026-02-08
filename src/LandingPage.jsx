import styles from './LandingPage.module.css';
import devsocLogo from './assets/devsocLogo.png';
import quizLogo from './assets/quizLogo.png';
import { useNavigate } from 'react-router-dom';
import { db } from "./firebase";
import { useState } from 'react';
import { ref, set, get } from "firebase/database";

export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  async function hashEmail(email) {
    const normalized = email.trim().toLowerCase();

    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  const handleStart = async () => {
    if (!valid) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    try {
      const hashedEmail = await hashEmail(email);
      const emailsRef = ref(db, 'emails/' + hashedEmail.toString());

      const check = await get(emailsRef);

      if (check.exists()) {
        setErrorMessage('Emails can only be used once');
        return;
      }

      await set(emailsRef, {
        email,
        started: new Date().toISOString(),
      });

      console.log('Email saved successfully');
      navigate('/questions-page', { state: { email } });

    } catch (error) {
      console.error('Error saving email:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailInput = (e) => {
    const newEmail = e.target.value;
    console.log(newEmail);

    if (newEmail.trim() === '') {
      setValid(false);
      setErrorMessage('Email is required'); // might change later depending on whether or not email is req
    } else if (emailRegex.test(newEmail)) {
      setValid(true);
      setErrorMessage('');
      setEmail(e.target.value);
    } else {
      setValid(false);
      setErrorMessage('Invalid email address');
    }

  }

  return (
    <div className={styles.landingContainer}>
      <img className={styles.logo} src={devsocLogo} alt="DevSoc Logo"/>
      <img className={styles.quizLogo} src={quizLogo} alt="Quiz Logo"/>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      
      <input className={styles.emailInput} type='email' placeholder='Email...' onChange={(e) => handleEmailInput(e)}/>

      <button onClick={handleStart} className={styles.startBtn}><b><em>START</em></b></button>
    </div>
  )
}
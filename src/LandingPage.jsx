import styles from './LandingPage.module.css';
import devsocLogo from './assets/devsocLogo.png';
import quizLogo from './assets/quizLogo.png';
import { useNavigate } from 'react-router-dom';
import { db } from "./firebase";
import { useState } from 'react';
import { ref, push } from "firebase/database";

export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  // const [emailConsent, setEmailConsent] = useState(false);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleStart = async () => {
    if (email) {
      try {
        const emailsRef = ref(db, 'emails');
        console.log(emailsRef);
        await push(emailsRef, {
          email: email,
          timestamp: new Date().toISOString(),
          consent: emailConsent
        });
        console.log('Email saved successfully');
      } catch (error) {
        console.error('Error saving email:', error);
      }
    }

    navigate('/questions-page');
  }

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
      
      <input className={styles.emailInput} type='email' placeholder='Email...' onBlur={(e) => handleEmailInput(e)}/>

      {/* <div className={styles.emailConsent}>
        <input className={styles.emailNotifs} id='emailNotifs' type='checkbox' checked={emailConsent} onChange={(e) => setEmailConsent(e.target.checked)}/>
        <label>
          I agree to receive emails and notifications from DevSoc
        </label>
      </div> */}

      <button onClick={handleStart} className={styles.startBtn}><b><em>START</em></b></button>
    </div>
  )
}
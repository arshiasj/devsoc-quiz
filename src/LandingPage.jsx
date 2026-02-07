import styles from './LandingPage.module.css';
import devsocLogo from './assets/devsocLogo.png';
import quizLogo from './assets/quizLogo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleStart = async () => {
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    if (!valid) {
      setErrorMessage("Valid email is required");
      return;
    }

    try {
      const res = await fetch("https://us-central1-devsoc-quiz.cloudfunctions.net/api/start-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error);
        return;
      }

      navigate("/questions-page", { state: { email }});
    } catch (err) {
      setErrorMessage("Server error. Please try again");
    }
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

      <button onClick={handleStart} className={styles.startBtn}><b><em>START</em></b></button>
    </div>
  )
}
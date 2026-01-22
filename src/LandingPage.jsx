import styles from './LandingPage.module.css';
import devsocLogo from './assets/devsocLogo.png';
import quizLogo from './assets/quizLogo.png';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questions-page');
  }

  return (
    <div className={styles.landingContainer}>
      <img className={styles.logo} src={devsocLogo} alt="DevSoc Logo"/>
      <img className={styles.quizLogo} src={quizLogo} alt="Quiz Logo"/>
      <input className={styles.emailInput} type='email' placeholder='Email...'/>

      <div className={styles.emailConsent}>
        <input className={styles.emailNotifs} id='emailNotifs' type='checkbox' />
        <label for="emailNotifs">
          I agree to receive emails and notifications from DevSoc
        </label>
      </div>

      <button onClick={handleStart} className={styles.startBtn}><b><em>START</em></b></button>
    </div>
  )
}
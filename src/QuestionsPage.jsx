import { useState, useEffect } from "react"
import styles from './QuestionsPage.module.css'
import structsLogo from './assets/structs.png';
import circlesLogo from './assets/circles.png';
import freeroomsLogo from './assets/freerooms.png';
import notanglesLogo from './assets/notangles.png';
import chaosLogo from './assets/chaos.png';
import unilectivesLogo from './assets/unilectives.png';
import { useLocation, useNavigate } from 'react-router-dom';


export default function QuestionsPage() {
  const { email } = useLocation().state;
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questionBank));
  }, []);

  useEffect(() => {
    if (shuffledQuestions.length === 0) return;

    if (index >= shuffledQuestions.length && shuffledQuestions.length > 0) {
      navigate('/completion-page', {
        state: { email, numCorrect, total: shuffledQuestions.length }
      });
      return;
    }

    const q = shuffledQuestions[index];
    setQuestion(q.question);
    setAnswer(q.answer);
    setOptions(generateOptions(q.answer));
  }, [index, shuffledQuestions]);

  const handleClick = (ans) => {
    if (ans === answer) {
      if (!incorrect) {
        setNumCorrect(numCorrect + 1);
      }
      setIncorrect(false);
      setIndex(index + 1);
    } else {
      setIncorrect(true);
    }
  }

  const questionBank = [
    { id: 1,
      question: "All COMP2521 students should use this project to revise, write and debug their Data Structures and Algorithms code",
      answer: "structs"
    },
    { id: 2,
      question: "A student looking to plan their classes for each course ahead of time should use this",
      answer: "notangles"
    },
    { id: 3,
      question: "Students use this project to pick their degree's required courses and pre-requisites to plan ahead for each year",
      answer: "circles"
    },
    { id: 4,
      question: "This DevSoc project is the first to launch a mobile app and assists students in finding available spaces on campus",
      answer: "freerooms"
    },
    { id: 5,
      question: "With most of its features completed, this DevSoc project lets students share and rate their experiences in courses",
      answer: "unilectives"
    },
    { id: 6,
      question: "It is rumoured that this DevSoc project aimed at simplifying university recruitment will be deployed this year",
      answer: "chaos"
    },
    { id: 7,
      question: "The newest project under DevSoc helps us keep track of all financials within the society",
      answer: "warchest"
    },
  ];

  const answers = [
    "structs",
    "notangles",
    "circles",
    "freerooms",
    "unilectives",
    "chaos",
    "warchest"
  ];

  const logos = {
    structs: structsLogo,
    circles: circlesLogo,
    freerooms: freeroomsLogo,
    unilectives: unilectivesLogo,
    notangles: notanglesLogo,
    chaos: chaosLogo
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateOptions = (correctAnswer, count = 4) => {
    const otherOptions = answers.filter(
      (ans) => ans != correctAnswer
    );
    const randomOptions = shuffleArray(otherOptions).slice(0, count - 1);
    return shuffleArray([correctAnswer, ...randomOptions]);
  }

  return(
    <div className={styles.questionsContainer}>
      <h1>Question {index + 1}</h1>
      <p className={styles.questionBox}><b>{question}</b></p>

      {incorrect && <p className={styles.answerBox}><b><em>Incorrect!</em></b> <br /> Correct answer: {answer.charAt(0).toUpperCase() + answer.slice(1)}</p>}

      {
        options.map((option) => (
          <button key={option} onClick={() => handleClick(option)} className={`${styles.answerBtn} ${styles[option + 'Btn']}`}>
            {logos[option] && <img src = {logos[option]}></img>}
            <b>{option.charAt(0).toUpperCase() + option.slice(1)}</b>
          </button>
        ))
      }
    </div>
  )
}
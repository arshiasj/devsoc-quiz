import { useState, useEffect } from "react"
import styles from './QuestionsPage.module.css'
import structsLogo from './assets/structs.png';
import circlesLogo from './assets/circles.png';
import freeroomsLogo from './assets/freerooms.png';
import questionsEmote from './assets/questionsEmote.png';


export default function QuestionsPage() {
  const [answer, setAnswer] = useState('');
  const [questionNum, setQuestionNum] = useState(1);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    getQuestion();
  });

  const getQuestion = () => {
    setQuestion(questionBank[0].question);
    setAnswer(questionBank[0].answer);
  }

  const questionBank = [
    { id: 1, question: "All COMP2521 students should use this project to revise, write and debug their Data Structures and Algorithms code", answer: "structs" },
    { id: 2, question: "Use this when planning out your term", answer: "notangles" }
  ]

  return(
    <div className={styles.questionsContainer}>
      <h1>Question {questionNum}</h1>
      <p className={styles.questionBox}><b>{question}</b></p>

      <button className={`${styles.answerBtn} ${styles.notanglesBtn}`}>
        <b>Notangles</b>
      </button>
      <button className={`${styles.answerBtn} ${styles.structsBtn}`}>
        <img src={structsLogo} />
        <b>Structs</b>
      </button>
      <button className={`${styles.answerBtn} ${styles.circlesBtn}`}>
        <img src={circlesLogo} />
        <b>Circles</b>
      </button>
      <button className={`${styles.answerBtn} ${styles.freeroomsBtn}`}>
        <img src={freeroomsLogo} />
        <b>Freerooms</b>
      </button>
      
      <div className={styles.questionsEmote}>
        <img src={questionsEmote} />
      </div>
    </div>
  )
}
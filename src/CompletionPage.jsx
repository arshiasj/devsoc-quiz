import { useLocation } from "react-router-dom";
import styles from "./CompletionPage.module.css";
import zero from "./assets/zero.jpeg";
import one from "./assets/one.jpg";
import two from "./assets/two.jpg";
import three from "./assets/three.jpg";
import four from "./assets/four.gif";
import five from "./assets/five.jpg";
import six from "./assets/six.jpg";
import seven from "./assets/seven.jpg";
import { ref, update } from "firebase/database";
import { db } from "./firebase";
import { useEffect } from "react";

export default function CompletionPage() {
	const { email, numCorrect, total } = useLocation().state;

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

	const submitScore = async (email, numCorrect) => {
		try {
			const hashedEmail = await hashEmail(email);
			const emailsRef = ref(db, 'emails/' + hashedEmail.toString());

			await update(emailsRef, {
				score: numCorrect,
				ended: new Date().toISOString(),
			});

			console.log('Score saved successfully');
		} catch (error) {
			console.error('Error saving email:', error);
		}
	}

	useEffect(() => {
		console.log('Submitting score for:', email, numCorrect);
		submitScore(email, numCorrect);
	}, [email, numCorrect]);
	
	const finalMessages = [
		"It is actually an incredible accomplishment to get all questions wrong. Show this to one of the helpers at the stall and you'll recieve a special prize",
		"I don't know if I should be impressed or disappointed that you managed to get this score since you have access to a flyer with all the information from our stall",
		"Congratulations! You have the equivalent brainpower of one of our execs after 10 bottles of alcohol and a game of Secret Hitler",
		"You just barely failed the quiz, luckily we are not as harsh as UNSW, you will only have to pay us $500 to retake the quiz, much cheaper than the cost for one course",
		"Congrats you passed. I'll give you a crisp high five and send you on your way knowing you are the DevSoc equivalent of the barely passing student with 50 WAM <3",
		"Congrats on the credit WAM. They say Ps get degrees but in compsci, if you don't have a WAM of 100, haven't yet founded a start-up and have less than 10 internships, you're cooked",
		"You were so close to glory but unfortunately, getting one question wrong puts you at around 1000th place because of the number of people taking this quiz",
		"Wow, a full score! Show one of the helpers at the stall for your prize. Congrats on either being able to read a flyer or having enough focus despite the moshpit at O-week"
	]

	const memes = [
		zero, one, two, three, four, five, six, seven
	]

	const res = finalMessages[numCorrect];
	const meme = memes[numCorrect];

	return (
		<div className={styles.completionContainer}>
			{meme && (
				<img
						src={meme}
						alt={`Score ${numCorrect} meme`}
						className={styles.meme}
				/>
			)}
			<h1>You got {numCorrect} out of {total}</h1>
			<p className={styles.resMsg}>{res}</p>
		</div>
	);
}
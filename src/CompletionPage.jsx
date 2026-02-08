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
import insta from "./assets/insta.jpg";
import fb from "./assets/fb.png";
import discord from "./assets/discord.jpg";
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

	const handleSocials = async (social) => {
		const discordURL = 'https://discord.gg/3T7gUe8J';
		const instaURL = 'https://www.instagram.com/devsoc_unsw/?hl=en';
		const fbURL = 'https://www.facebook.com/devsocUNSW/';
		if (social === "discord") {
			window.open(discordURL, '_blank', 'noopener,noreferrer');
		} else if (social === "insta") {
			window.open(instaURL, '_blank', 'noopener,noreferrer');
		} else if (social == "facebook") {
			window.open(fbURL, '_blank', 'noopener,noreferrer');
		}
	}
	
	const finalMessages = [
		"It is actually an incredible accomplishment to get all questions wrong. I'm sure the helpers at the stall would love to see this",
		"I don't know if I should be impressed or disappointed. At least you didn't get 0",
		"Congratulations! You have the equivalent brainpower of one of our directors on half an hour of sleep",
		"You just barely failed the quiz, luckily we are not as harsh as UNSW, you will only have to pay us $500 to retake the quiz, much cheaper than the cost for one course",
		"Congrats you passed. I'll give you a crisp high five and send you on your way with a 50 WAM <#",
		"Congrats on the credit WAM. They say Ps get degrees but in compsci, you're cooked",
		"You were so close to glory but unfortunately, we have no consolation prizes",
		"Wow, a full score! You will be entered into a raffle for some exclusive merch!"
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
			<h2>Please follow us on our Socials</h2>
			<div className={styles.logosContainer}>
				<img src={insta} className={styles.logo} onClick={() => handleSocials("insta")}></img>
				<img src={fb} className={styles.logo} onClick={() => handleSocials("facebook")}></img>
				<img src={discord} className={styles.logo} onClick={() => handleSocials("discord")}></img>
			</div>
		</div>
	);
}
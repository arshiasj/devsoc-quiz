import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/start-quiz", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const docRef = db.collection("participants").doc(email);
  const doc = await docRef.get();
  const TEST_EMAIL = "internalstest@devsoc.app";

  if (email !== TEST_EMAIL && doc.exists) {
    return res.status(409).json({ error: "This email has already been used" });
  }

  await docRef.set(
    {
      email,
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  res.json({ message: "Good luck" });
});

app.post("/submit-quiz", async (req, res) => {
  const { email, score } = req.body;

  if (!email || score == null) {
    return res.status(400).json({ error: "Missing data" });
  }

  await db.collection("participants").doc(email).set(
    {
      score,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  res.json({ message: "Score recorded" });
});

export const api = functions.https.onRequest(app);

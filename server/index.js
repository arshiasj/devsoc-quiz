import express from "express";
import cors from "cors";
import { db, admin } from "./firebase.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/start-quiz", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });

    try {
        const docRef = db.collection("participants").doc(email);
        const doc = await docRef.get();
        const TEST_EMAIL = "internalstest@devsoc.app";

        if (email !== TEST_EMAIL && doc.exists) {
            return res.status(409).json({ error: "This email has already been used" });
        }

        await docRef.set({
            email,
            startedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        return res.status(200).json({ message: "Good luck" });
    } catch (err) {
        console.error("Firestore error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.post("/api/submit-quiz", async (req, res) => {
    const { email, score } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });
    if (score == null) return res.status(400).json({ error: "Score required" });

    try {
        const docRef = db.collection("participants").doc(email);

        await docRef.set({
            score,
            completedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        return res.status(200).json({ message: "Score recorded" });
    } catch (err) {
        console.error("Firestore error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Express running on http://localhost:3001");
});
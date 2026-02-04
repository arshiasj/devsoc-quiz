import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@unsw.edu.au")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  res.json({ success: true });
});

export default router;
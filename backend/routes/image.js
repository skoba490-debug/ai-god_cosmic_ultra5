import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { prompt } = req.body;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
  res.json({ url });
});

export default router;

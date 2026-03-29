import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(req.body.prompt)}`;
  res.json({ url });
});

export default router;

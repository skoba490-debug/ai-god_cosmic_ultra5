import express from "express";
import { ai1 } from "../services/ai1.js";
import { ai2 } from "../services/ai2.js";
import { ai3 } from "../services/ai3.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  const results = await Promise.all([
    ai1(message),
    ai2(message),
    ai3(message)
  ]);

  res.json({ reply: results.join("\n\n") });
});

export default router;

import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const message = req.body.message || "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "AI не ответил";

    res.json({ reply });

  } catch (e) {
    console.error(e);
    res.json({ reply: "Ошибка сервера" });
  }
});

export default router;

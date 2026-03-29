import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const message = req.body.message || '';
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'AI ответ не получен';
    res.json({ reply });
  } catch (e) {
    res.json({ reply: 'Ошибка при подключении к AI' });
  }
});

export default router;

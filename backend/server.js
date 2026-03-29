import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import chatRoute from './routes/chat.js';
import imageRoute from './routes/image.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Маршруты API
app.use('/api/chat', chatRoute);
app.use('/api/image', imageRoute);

// Статический фронтенд
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

Отлично, тогда вот код для файла chat.js:
JavaScript


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


А теперь следующий файл image.js:
JavaScript

import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(req.body.prompt)}`;
  res.json({ url });
});

export default router;

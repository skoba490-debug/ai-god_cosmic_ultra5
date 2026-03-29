const chat = document.getElementById("chat");
let listening = false;
let recognition;

function newChat() {
  chat.innerHTML = "";
}

async function send() {
  const text = input.value;
  if (!text) return;

  addMsg(text, 'user');
  input.value = "";

  await sendToAI(text);
}

function addMsg(text, type) {
  chat.innerHTML += `<div class="msg ${type}">${text}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

async function sendToAI(text) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  addMsg(data.reply, 'ai');
  speak(data.reply);
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ru-RU';
  utter.onend = () => {
    if (listening) startListening();
  };
  speechSynthesis.speak(utter);
}

function toggleVoice() {
  listening = !listening;
  if (listening) startListening();
  else if (recognition) recognition.stop();
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Голос не поддерживается в этом браузере');
    return;
  }
  recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.continuous = false;

  recognition.start();

  recognition.onresult = async (e) => {
    const text = e.results[0][0].transcript;
    addMsg('🎤 ' + text, 'user');
    await sendToAI(text);
  };

  recognition.onend = () => {
    if (listening) startListening();
  };
}

import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setMessages([...messages, {user: input, ai: data.reply}]);
    setInput("");
  };

  return (
    <div>
      {messages.map((m,i)=>(
        <div key={i}>
          <b>Ты:</b> {m.user}<br/>
          <b>AI:</b> {m.ai}
        </div>
      ))}
      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={send}>Отправить</button>
    </div>
  );
}

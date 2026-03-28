import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import chat from "./routes/chat.js";
import image from "./routes/image.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API
app.use("/api/chat", chat);
app.use("/api/image", image);

// FRONTEND (ВАЖНО)
app.use(express.static(path.join(__dirname, "../frontend")));

// fallback (фикс Cannot GET)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));

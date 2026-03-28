import express from "express";
import chatRoute from "./routes/chat.js";
import imageRoute from "./routes/image.js";

const app = express();
app.use(express.json());

app.use("/api/chat", chatRoute);
app.use("/api/image", imageRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

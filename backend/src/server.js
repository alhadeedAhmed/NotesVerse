import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
// built-in middleware > it allows us to get access to req.body we used in create update, otherwise it give undefined, so we use it, it get access to title and content here
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

// Our custom middlware, this define before ocming response, this will print betwee nreq and response befroe respone.
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
  next();
}); // output: Request method is GET and Request URL is /api/notes

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
  });
});

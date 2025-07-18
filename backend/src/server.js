import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// built-in middleware > it allows us to get access to req.body we used in create update, otherwise it give undefined, so we use it, it get access to title and content here
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Our custom middlware, this define before ocming response, this will print betwee nreq and response befroe respone.
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
  next();
}); // output: Request method is GET and Request URL is /api/notes

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
  });
});

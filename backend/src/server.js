import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }))
}

app.use(express.json()); // Parse JSON bodies
app.use(rateLimiter);


//simple custom middleware to log requests
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV === "production") {

  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Anything that doesn't match the above, send back index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Exit the process if connection fails
});

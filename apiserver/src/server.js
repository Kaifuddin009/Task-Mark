import pool from './database/db.js';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import noteRouter from './routes/note.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());

// ✅ Allow frontend (both local + deployed)
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://your-frontend.onrender.com" // deployed frontend URL
];

app.use(cors({
  origin: allowedOrigins,  // your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use("/api/notes", noteRouter);

// ✅ Production: serve frontend build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));


  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client","dist","index.html"));
  });
}


const startServer = async()=>{
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected successfully!");
    conn.release();

    app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}
startServer();


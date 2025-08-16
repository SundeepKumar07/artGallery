import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import mongoDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import visitorRouter from './routes/visitorRouter.js';
const app = express();

// ✅ Load environment variables
dotenv.config();

// ✅ Middleware
const _dirname = path.resolve();
app.use(express.json());
app.use(cookieParser()); // ❗️CALL the function — you missed `()`
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

// ✅ Connect MongoDB
mongoDB();

// ✅ Routes
// app.get('/', (req, res) => {
//   res.send("Welcome Sundeep");
// });

app.use('/api/auth', authRouter);
app.use('/api/art', userRouter);
app.use('/api/visitor', visitorRouter);

app.use(express.static(path.join(_dirname,'..', '/frontend/dist')));
app.get('/', (_, res) => {
  res.sendFile(path.join(_dirname,'..', 'frontend', 'dist', 'index.html'))
})

// ✅ Error handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // ❗️ Typo: `statusConde`
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
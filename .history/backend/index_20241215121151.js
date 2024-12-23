import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/userRouter.js';
import dotenv from 'dotenv';
import todorouter from './routes/todoRouter.js';
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User API routes
app.use('/api/user', router);
app.use("/api/v1",todorouter)
// MongoDB connection
mongoose
  .connect(process.env.Mongodb_url)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server port
const PORT =process.env.PORT||7000;
app.listen(process.env.PORT||7000, () => {
  console.log(`Server is running on port ${PORT}`);
});

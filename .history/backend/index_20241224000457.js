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
app.use(
  cors({
    origin: "https://todoist-potb.vercel.app", // Frontend URL
    credentials: true, // Include credentials if using cookies or authentication headers
  })
);
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Todoist API!');
});

// API Routes
app.use('/api/users', router); // User-related routes
app.use('/api', todorouter); // Todo-related routes

// MongoDB connection
mongoose
  .connect(process.env.Mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server port
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // For Vercel compatibility

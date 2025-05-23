import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import emotionRoutes from './routes/emotions.js';
import applicationRoutes from './routes/applications.js';
import exportRoutes from './routes/exports.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/emotions', emotionRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/export', exportRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

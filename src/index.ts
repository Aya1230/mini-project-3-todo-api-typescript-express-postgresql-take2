import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the todo routes at the root path
app.use('/api', todoRoutes);

// Global error handling middleware (must come after routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

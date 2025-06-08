// Import the Pool class to create a connection pool to PostgreSQL
import { Pool } from 'pg';
// Load environment variables from .env file
import dotenv from 'dotenv';

dotenv.config();

// Create a new connection pool using values from .env
export const pool = new Pool({
  user: process.env.DB_USER,          // PostgreSQL username
  host: process.env.DB_HOST,          // Database host (e.g., localhost)
  database: process.env.DB_DATABASE,  // Name of the database
  password: process.env.DB_PASSWORD,  // Password for the database user
  port: parseInt(process.env.DB_PORT || '5432', 10), // Port number (parsed as a base-10 number)
});

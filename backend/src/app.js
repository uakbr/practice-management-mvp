const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/dbConfig');

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

const protectedRoutes = require('./routes/protectedRoutes');

// ... existing routes ...
app.use('/api/protected', protectedRoutes);

module.exports = app;
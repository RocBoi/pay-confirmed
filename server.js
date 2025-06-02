// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db'); // MongoDB connection
const routes = require('./routes');       // Import route index

// Init app
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// API Routes
app.use('/api', routes);

// Export app for index.js
module.exports = app;
require('dotenv').config();
const db = require('./db');

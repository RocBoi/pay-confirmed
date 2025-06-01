// File: backend/config/db.js

const mongoose = require('mongoose'); const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => { try { const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, }); console.log(MongoDB Connected: ${conn.connection.host}); } catch (err) { console.error(Error: ${err.message}); process.exit(1); } };

module.exports = connectDB;

// File: backend/server.js

const express = require('express'); const cors = require('cors'); const dotenv = require('dotenv'); const helmet = require('helmet'); const morgan = require('morgan'); const authRoutes = require('./routes/auth'); const businessRoutes = require('./routes/business'); const payrollRoutes = require('./routes/payroll'); const connectDB = require('./config/db');

// Load environment variables dotenv.config();

// Connect to database connectDB();

const app = express();

// Middleware app.use(express.json()); app.use(cors()); app.use(helmet()); app.use(morgan('dev'));

// Routes app.use('/api/auth', authRoutes); app.use('/api/business', businessRoutes); app.use('/api/payroll', payrollRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(Server running on port ${PORT}));

  

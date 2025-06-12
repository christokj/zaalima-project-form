const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/auth_demo')
    .then(() => {
        app.listen(5000, () => console.log('Server running on http://localhost:5000'));
    })
    .catch(err => console.error('MongoDB connection failed:', err));

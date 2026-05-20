const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Online Learning Platform API Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

module.exports = app;

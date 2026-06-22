const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();
require('./utils/envCheck');

const app = express();

const allowedOrigins = [
  'https://crm-tracker-opal.vercel.app',
  'http://localhost:5173',              
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      console.log('CORS Request from origin:', origin);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'CRM Opportunity Tracker API is running' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
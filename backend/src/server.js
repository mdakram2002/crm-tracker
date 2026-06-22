const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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

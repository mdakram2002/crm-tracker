const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crm-tracker';

  if (!process.env.MONGO_URI) {
    console.warn('WARNING: MONGO_URI is not set. Falling back to default local MongoDB URI.');
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (!mongoUri) {
      console.error('MongoDB connection failed: MONGO_URI is undefined. Set MONGO_URI in backend/.env or use a local MongoDB instance.');
    } else {
      console.error('MongoDB connection failed:', error.message);
    }
    process.exit(1);
  }
};

module.exports = connectDB;

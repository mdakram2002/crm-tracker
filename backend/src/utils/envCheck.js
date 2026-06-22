const dotenv = require('dotenv');

dotenv.config();

const requiredVars = ['MONGO_URI', 'JWT_SECRET'];
const missing = requiredVars.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Please configure these in backend/.env or your deployment environment.');
  process.exit(1);
}

module.exports = {};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const sendEmail = require('../utils/email');

const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set in environment variables. Please create backend/.env and set JWT_SECRET.');
  }

  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2h'
  });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  try {
    await sendEmail({
      to: user.email,
      subject: 'Welcome to CRM Opportunity Tracker',
      text: `Hello ${user.name},\n\nThank you for registering.`
    });
  } catch (error) {
    console.warn('Welcome email failed:', error.message);
  }

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user._id)
  });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token: generateToken(user._id)
  });
};

module.exports = { registerUser, loginUser };

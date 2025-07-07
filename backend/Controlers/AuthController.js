import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/AuthModel.js';
import { validationResult } from 'express-validator';

// POST -signup
export const signup = async (req, res) => {
  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, gmail, password } = req.body;

  try {
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, gmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST -signin
export const signin = async (req, res) => {
  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials (email not found)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials (wrong password)' });
    }

    const token = jwt.sign(
      { userId: user._id, gmail: user.gmail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        gmail: user.gmail,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

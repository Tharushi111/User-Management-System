import express from 'express';
import { signup, signin } from '../Controlers/AuthController.js';
import { body } from 'express-validator';

const router = express.Router();

// Signup route with validation
router.post('/signup', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .matches(/^[A-Za-z ]+$/).withMessage('Name must contain only letters'),
  body('gmail')
    .trim()
    .isEmail().withMessage('Enter a valid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], signup);

// Signin route (validate email + password presence)
router.post('/signin', [
  body('gmail').trim().isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], signin);

export default router;

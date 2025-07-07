import express from 'express';
import {
  addUser,
  getAllUsers,
  getById,
  updateUser,
  deleteUser,
} from '../Controlers/UserControllers.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation rules
const userValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .matches(/^[A-Za-z ]+$/).withMessage('Name must contain only letters'),
  body('gmail')
    .isEmail().withMessage('Valid Gmail is required'),
  body('age')
    .isInt({ min: 0 }).withMessage('Age must be a valid positive number'),
  body('address')
    .notEmpty().withMessage('Address is required')
];

// Routes
router.get('/', getAllUsers);
router.get('/:id', getById);
router.post('/', userValidationRules, addUser);
router.put('/:id', userValidationRules, updateUser);
router.delete('/:id', deleteUser);

export default router;

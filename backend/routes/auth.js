const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

const registrationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['parent', 'teacher']).withMessage('Role must be parent or teacher')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').isIn(['parent', 'teacher']).withMessage('Role must be parent or teacher')
];

router.post('/parent/register', registrationValidation, (req, res) => {
  req.body.role = 'parent';
  register(req, res);
});

router.post('/parent/login', loginValidation, (req, res) => {
  req.body.role = 'parent';
  login(req, res);
});

router.post('/teacher/register', registrationValidation, (req, res) => {
  req.body.role = 'teacher';
  register(req, res);
});

router.post('/teacher/login', loginValidation, (req, res) => {
  req.body.role = 'teacher';
  login(req, res);
});

router.get('/me', verifyToken, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/parent/dashboard', verifyToken, requireRole('parent'), (req, res) => {
  res.json({ message: 'Welcome to Parent Dashboard', user: req.user });
});

router.get('/teacher/dashboard', verifyToken, requireRole('teacher'), (req, res) => {
  res.json({ message: 'Welcome to Teacher Dashboard', user: req.user });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;

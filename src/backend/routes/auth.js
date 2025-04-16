
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Use a default secret if JWT_SECRET is not defined
    const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  console.log('Received signup request with data:', { name, email, passwordLength: password ? password.length : 0 });
  
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      password  // Will be hashed by the pre-save middleware in the User model
    });
    
    console.log('Created new user object:', { 
      id: user._id,
      name: user.name,
      email: user.email
    });
    
    // Save the user to the database
    await user.save();
    console.log('User saved to database successfully');
    
    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    // Use a default secret if JWT_SECRET is not defined
    const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';
    
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          throw err;
        }
        console.log('JWT token generated successfully');
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          } 
        });
      }
    );
  } catch (err) {
    console.error('Server error during signup:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Received signin request for email:', email);
  
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('User authenticated successfully:', email);
    
    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    // Use a default secret if JWT_SECRET is not defined
    const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';
    
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          throw err;
        }
        console.log('JWT token generated successfully');
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          } 
        });
      }
    );
  } catch (err) {
    console.error('Server error during signin:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    console.log('Getting user profile for ID:', req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      console.log('User not found with ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User profile retrieved successfully');
    res.json(user);
  } catch (err) {
    console.error('Server error getting user profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

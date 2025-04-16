
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Auction = require('../models/Auction');
const User = require('../models/User');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   GET /api/auctions
// @desc    Get all auctions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find().sort({ createdAt: -1 });
    res.json(auctions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auctions/:id
// @desc    Get auction by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    res.json(auction);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auctions
// @desc    Create a new auction
// @access  Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, imageUrl, startingPrice, endDate } = req.body;
  
  try {
    const newAuction = new Auction({
      title,
      description,
      imageUrl,
      startingPrice,
      currentBid: startingPrice,
      endDate,
      sellerId: req.user.id,
      bids: []
    });
    
    const auction = await newAuction.save();
    res.json(auction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auctions/:id/bid
// @desc    Place a bid on an auction
// @access  Private
router.post('/:id/bid', verifyToken, async (req, res) => {
  const { amount } = req.body;
  
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    // Check if auction has ended
    if (new Date(auction.endDate) < new Date()) {
      return res.status(400).json({ message: 'Auction has ended' });
    }
    
    // Check if amount is higher than current bid
    if (amount <= auction.currentBid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }
    
    // Create new bid
    const newBid = {
      userId: req.user.id,
      amount,
      timestamp: new Date()
    };
    
    // Add bid to auction and update current bid
    auction.bids.push(newBid);
    auction.currentBid = amount;
    
    await auction.save();
    
    res.json(auction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

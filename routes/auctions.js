
const express = require('express');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find()
      .sort({ createdAt: -1 })
      .populate('seller', 'name email');
    
    res.json(auctions);
  } catch (error) {
    console.error('Get auctions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single auction
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'name email')
      .populate('bids.bidder', 'name email');
    
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    res.json(auction);
  } catch (error) {
    console.error('Get auction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create auction
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, imageUrl, startingPrice, endDate } = req.body;
    
    const auction = new Auction({
      title,
      description,
      imageUrl,
      startingPrice,
      currentPrice: startingPrice,
      seller: req.user._id,
      endDate
    });
    
    await auction.save();
    
    res.status(201).json(auction);
  } catch (error) {
    console.error('Create auction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Place bid
router.post('/:id/bid', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    
    // Check if auction is active
    if (auction.status !== 'active') {
      return res.status(400).json({ message: 'This auction is no longer active' });
    }
    
    // Check if auction has ended
    if (new Date(auction.endDate) < new Date()) {
      auction.status = 'ended';
      await auction.save();
      return res.status(400).json({ message: 'This auction has ended' });
    }
    
    // Check if bid amount is higher than current price
    if (amount <= auction.currentPrice) {
      return res.status(400).json({ message: 'Bid must be higher than current price' });
    }
    
    // Add bid
    auction.bids.push({
      bidder: req.user._id,
      amount
    });
    
    auction.currentPrice = amount;
    await auction.save();
    
    res.json(auction);
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

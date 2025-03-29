
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '/placeholder.svg'
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    default: function() {
      return this.startingPrice;
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'ended', 'cancelled'],
    default: 'active'
  },
  bids: [bidSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;

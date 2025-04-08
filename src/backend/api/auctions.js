
/**
 * Auctions API functions
 * 
 * Note: This is a placeholder file for backend auction functionality.
 * In a real application, you would implement actual database interactions here.
 */

// Mock auctions data
const auctions = [
  {
    id: '1',
    title: 'Vintage Camera Collection',
    description: 'A collection of rare vintage cameras from the 1950s. Includes Leica, Rolleiflex, and Hasselblad models.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    startingPrice: 1500,
    currentBid: 2300,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    sellerId: '2',
    bids: [
      { userId: '3', amount: 1700, timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
      { userId: '4', amount: 2000, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      { userId: '3', amount: 2300, timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: '2',
    title: 'Modern Art Painting',
    description: 'Original acrylic painting by upcoming artist Jane Doe. Abstract modernist style with vibrant colors.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    startingPrice: 800,
    currentBid: 950,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    sellerId: '3',
    bids: [
      { userId: '2', amount: 850, timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() },
      { userId: '4', amount: 900, timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
      { userId: '2', amount: 950, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  {
    id: '3',
    title: 'Antique Pocket Watch',
    description: 'Gold-plated pocket watch from the early 1900s. Still functioning with original movement.',
    imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    startingPrice: 500,
    currentBid: 750,
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    sellerId: '1',
    bids: [
      { userId: '4', amount: 550, timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString() },
      { userId: '3', amount: 650, timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString() },
      { userId: '2', amount: 700, timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
      { userId: '4', amount: 750, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
    ]
  }
];

// Get all auctions
export const getAllAuctions = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return auctions;
};

// Get auction by ID
export const getAuctionById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const auction = auctions.find(auction => auction.id === id);
  
  if (!auction) {
    throw new Error('Auction not found');
  }
  
  return auction;
};

// Place a bid on an auction
export const placeBid = async (auctionId, userId, amount) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const auction = auctions.find(auction => auction.id === auctionId);
  
  if (!auction) {
    throw new Error('Auction not found');
  }
  
  // Check if amount is higher than current bid
  if (amount <= auction.currentBid) {
    throw new Error('Bid must be higher than current bid');
  }
  
  // Check if auction has ended
  if (new Date(auction.endDate) < new Date()) {
    throw new Error('Auction has ended');
  }
  
  // Add new bid
  const newBid = {
    userId,
    amount,
    timestamp: new Date().toISOString()
  };
  
  auction.bids.push(newBid);
  auction.currentBid = amount;
  
  return {
    auction,
    bid: newBid
  };
};

// Create a new auction
export const createAuction = async (auctionData, sellerId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newAuction = {
    id: (auctions.length + 1).toString(),
    ...auctionData,
    sellerId,
    bids: [],
    currentBid: auctionData.startingPrice,
    createdAt: new Date().toISOString()
  };
  
  auctions.push(newAuction);
  
  return newAuction;
};

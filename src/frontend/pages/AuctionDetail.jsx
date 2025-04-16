
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BidForm from '../components/BidForm';

const AuctionDetail = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API fetch with timeout
    const fetchAuction = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data for a single auction
          const mockAuction = {
            id: parseInt(id),
            title: 'Vintage Mechanical Watch',
            description: 'Rare 1960s Swiss mechanical watch in excellent condition. This timepiece features a hand-wound movement, original dial, and leather strap. The watch has been serviced recently and keeps accurate time. The case shows minimal signs of wear consistent with its age.',
            imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            startingPrice: 250,
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            seller: 'VintageCollector',
            sellerRating: 4.8,
            condition: 'Excellent',
            category: 'Watches',
            bids: [
              { id: 1, amount: 250, bidder: 'user1', timestamp: '2023-01-01T12:00:00Z' },
              { id: 2, amount: 275, bidder: 'user2', timestamp: '2023-01-02T14:30:00Z' },
              { id: 3, amount: 300, bidder: 'user3', timestamp: '2023-01-03T09:15:00Z' },
            ],
            additionalImages: [
              'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1620619767685-1e2e65046945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
          };
          
          setAuction(mockAuction);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load auction details');
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  // Helper to get highest bid amount
  const getHighestBid = () => {
    if (!auction || !auction.bids || auction.bids.length === 0) {
      return auction?.startingPrice || 0;
    }
    return Math.max(...auction.bids.map(bid => bid.amount));
  };

  // Format time remaining
  const getTimeRemaining = () => {
    if (!auction) return '';
    
    const endDate = new Date(auction.endDate);
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const handleBidPlaced = (amount) => {
    const newBid = {
      id: Date.now(),
      amount,
      bidder: 'currentUser', // In a real app, this would be the actual user
      timestamp: new Date().toISOString(),
    };
    
    setAuction(prev => ({
      ...prev,
      bids: [...(prev.bids || []), newBid],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-foreground/70">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Auction Not Found</h2>
          <p className="text-foreground/70">The auction you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Image gallery */}
          <div>
            <div className="rounded-xl overflow-hidden bg-muted/30 mb-4">
              <img 
                src={auction.imageUrl} 
                alt={auction.title} 
                className="w-full object-cover h-[400px]"
              />
            </div>
            
            {auction.additionalImages && (
              <div className="grid grid-cols-3 gap-4">
                {auction.additionalImages.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden bg-muted/30">
                    <img 
                      src={img}
                      alt={`${auction.title} - view ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right column - Auction details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                  {auction.category}
                </span>
                <span className="text-sm text-foreground/60">
                  ID: {auction.id}
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">{auction.title}</h1>
              <div className="flex items-center mb-4">
                <span className="text-foreground/60 text-sm">Sold by </span>
                <span className="font-medium ml-1">{auction.seller}</span>
                {auction.sellerRating && (
                  <div className="flex items-center ml-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{auction.sellerRating}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-foreground/60">Current bid</p>
                  <p className="text-3xl font-display font-bold">${getHighestBid()}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Time left</p>
                  <p className="text-lg font-semibold">{getTimeRemaining()}</p>
                </div>
              </div>
              
              <BidForm 
                auction={auction} 
                currentBid={getHighestBid()} 
                onBidPlaced={handleBidPlaced}
              />
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-display font-bold mb-3">Description</h2>
              <p className="text-foreground/80 leading-relaxed">{auction.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-display font-bold mb-3">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60">Condition</p>
                  <p className="font-medium">{auction.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Starting price</p>
                  <p className="font-medium">${auction.startingPrice}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-display font-bold mb-3">Bid History</h2>
              {auction.bids && auction.bids.length > 0 ? (
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium">Bidder</th>
                        <th className="px-4 py-2 text-left font-medium">Amount</th>
                        <th className="px-4 py-2 text-left font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...auction.bids].reverse().map(bid => (
                        <tr key={bid.id} className="border-t">
                          <td className="px-4 py-2">{bid.bidder}</td>
                          <td className="px-4 py-2 font-medium">${bid.amount}</td>
                          <td className="px-4 py-2 text-foreground/60">
                            {new Date(bid.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-foreground/60">No bids yet. Be the first to bid!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;

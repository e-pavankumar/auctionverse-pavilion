
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BidForm from '../components/BidForm';
import { toast } from 'sonner';

const mockAuctions = [
  {
    id: 1,
    title: 'Vintage Mechanical Watch',
    description: 'Rare 1960s Swiss mechanical watch in excellent condition. Features a 17-jewel movement, original dial, and recently serviced mechanism. The case shows minimal wear and the crystal is clear with no scratches. Comes with original box and papers.',
    imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 250,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    seller: 'VintageCollector',
    bids: [
      { id: 1, amount: 250, bidder: 'user1', timestamp: '2023-01-01T12:00:00Z' },
      { id: 2, amount: 275, bidder: 'user2', timestamp: '2023-01-02T14:30:00Z' },
      { id: 3, amount: 300, bidder: 'user3', timestamp: '2023-01-03T09:15:00Z' },
    ],
    category: 'Watches',
    condition: 'Excellent',
    location: 'Zurich, Switzerland',
    shippingInfo: 'Worldwide shipping available, fully insured',
  },
  // ... Add the other auctions from the Home page here
];

const AuctionDetail = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Simulate loading the auction from API
    setTimeout(() => {
      const foundAuction = mockAuctions.find(a => a.id === parseInt(id));
      setAuction(foundAuction || null);
      setLoading(false);
    }, 800);
  }, [id]);
  
  const handleBidPlaced = (amount) => {
    if (!currentUser) return;
    
    const newBid = {
      id: Date.now(),
      amount,
      bidder: currentUser.id,
      timestamp: new Date().toISOString(),
    };
    
    setAuction(prev => ({
      ...prev,
      bids: [...(prev.bids || []), newBid],
    }));
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const currentBid = auction?.bids && auction.bids.length > 0 
    ? Math.max(...auction.bids.map(bid => bid.amount)) 
    : auction?.startingPrice || 0;
  
  const timeLeft = () => {
    if (!auction) return '';
    
    const now = new Date();
    const end = new Date(auction.endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let result = '';
    if (days > 0) result += `${days} day${days !== 1 ? 's' : ''} `;
    if (hours > 0) result += `${hours} hour${hours !== 1 ? 's' : ''} `;
    result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    
    return `${result} left`;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!auction) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-display font-bold mb-4">Auction Not Found</h1>
        <p className="text-foreground/60 mb-6">The auction you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90">
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-6">
            <Link to="/" className="text-foreground/60 hover:text-foreground">Home</Link>
            <span className="mx-2 text-foreground/40">/</span>
            <Link to="/" className="text-foreground/60 hover:text-foreground">Auctions</Link>
            <span className="mx-2 text-foreground/40">/</span>
            <span className="text-foreground/80">{auction.title}</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <div className="animate-fade-in">
              <div className="rounded-xl overflow-hidden bg-muted">
                <img 
                  src={auction.imageUrl} 
                  alt={auction.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="mt-6 glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-lg mb-4">Seller Information</h3>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {auction.seller.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{auction.seller}</p>
                    <p className="text-sm text-foreground/60">Member since 2020</p>
                  </div>
                </div>
                <hr className="my-4 border-foreground/10" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Location:</span>
                    <span>{auction.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Shipping:</span>
                    <span>{auction.shippingInfo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Condition:</span>
                    <span>{auction.condition}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Details and Bidding */}
            <div className="animate-fade-up">
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2">
                {auction.title}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {auction.category}
                </div>
                <div className="ml-3 text-foreground/60 text-sm">
                  {auction.bids?.length || 0} bid{auction.bids?.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-foreground/60 text-sm">Current Bid</p>
                    <p className="text-3xl font-display font-bold text-primary">
                      ${currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground/60 text-sm">Auction Ends</p>
                    <p className="font-medium">{formatDate(auction.endDate)}</p>
                    <p className="text-primary text-sm font-medium mt-1">
                      {timeLeft()}
                    </p>
                  </div>
                </div>
                
                <BidForm 
                  auction={auction} 
                  currentBid={currentBid}
                  onBidPlaced={handleBidPlaced}
                />
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-display font-semibold mb-3">Description</h2>
                <p className="text-foreground/80 leading-relaxed">
                  {auction.description}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-display font-semibold mb-3">Bid History</h2>
                {auction.bids && auction.bids.length > 0 ? (
                  <div className="glass-card rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-medium text-foreground/80">Bidder</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-foreground/80">Amount</th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-foreground/80">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...auction.bids].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(bid => (
                          <tr key={bid.id} className="border-t border-foreground/10">
                            <td className="py-3 px-4 text-sm">
                              {bid.bidder}
                            </td>
                            <td className="py-3 px-4 text-sm text-right font-medium">
                              ${bid.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-sm text-right text-foreground/60">
                              {new Date(bid.timestamp).toLocaleString()}
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
    </div>
  );
};

export default AuctionDetail;

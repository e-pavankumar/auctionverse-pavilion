
import { Link } from 'react-router-dom';

const AuctionCard = ({ auction }) => {
  const timeLeft = () => {
    const now = new Date();
    const end = new Date(auction.endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };
  
  const highestBid = auction.bids && auction.bids.length > 0 
    ? Math.max(...auction.bids.map(bid => bid.amount)) 
    : auction.startingPrice;
    
  return (
    <Link 
      to={`/auction/${auction.id}`} 
      className="block h-full"
    >
      <div className="h-full glass-card rounded-xl overflow-hidden hover-lift">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={auction.imageUrl} 
            alt={auction.title} 
            className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-primary">
            {timeLeft()}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-medium text-lg tracking-tight mb-1">
            {auction.title}
          </h3>
          
          <p className="text-foreground/60 text-sm mb-4 truncate">
            {auction.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-foreground/60 uppercase">Current Bid</p>
              <p className="font-display font-semibold text-primary">
                ${highestBid.toLocaleString()}
              </p>
            </div>
            
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {auction.bids?.length || 0} bids
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;

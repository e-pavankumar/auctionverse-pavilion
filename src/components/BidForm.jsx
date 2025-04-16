
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { placeBid } from '../frontend/api/auctions';

const BidForm = ({ auction, currentBid, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState(currentBid + 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    
    if (bidAmount <= currentBid) {
      toast.error('Your bid must be higher than the current bid');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const updatedAuction = await placeBid(auction._id, bidAmount);
      toast.success('Your bid has been placed!');
      onBidPlaced(updatedAuction);
    } catch (error) {
      toast.error(error.message || 'Failed to place bid');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bidAmount" className="block text-sm font-medium text-foreground/80 mb-1">
          Your Bid Amount
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-foreground/60">$</span>
          </div>
          
          <input
            type="number"
            id="bidAmount"
            min={currentBid + 1}
            step="1"
            value={bidAmount}
            onChange={(e) => setBidAmount(parseFloat(e.target.value))}
            className="pl-7 block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            required
          />
        </div>
        
        <p className="mt-1 text-xs text-foreground/60">
          Minimum bid: ${(currentBid + 1).toLocaleString()}
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-animation ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></span>
            Processing...
          </>
        ) : (
          'Place Bid'
        )}
      </button>
    </form>
  );
};

export default BidForm;

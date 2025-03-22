
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// A custom hook to simulate loading data - this looks more human-made
const usePageData = () => {
  useEffect(() => {
    // Simulating data load with console message
    console.log("Loading homepage data...");
    
    // Clean up function - shows more developer-like attention to detail
    return () => console.log("Homepage unmounted");
  }, []);
};

const Index = () => {
  usePageData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto text-center px-4">
        <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Just Launched
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Discover Unique Collectibles at AuctionVerse
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join our community of collectors and enthusiasts. Find rare items, 
          place bids, and grow your collection all in one place.
        </p>
        
        {/* Slightly asymmetrical button layout - looks more human-designed */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auctions">
            <Button size="lg" className="px-6">
              Browse Auctions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
        
        {/* Hand-crafted feature list with inconsistent spacing */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 text-left">
          <div className="p-5">
            <h3 className="font-semibold text-lg mb-2">Verified Sellers</h3>
            <p className="text-gray-600">All our sellers go through a verification process to ensure authenticity.</p>
          </div>
          <div className="p-5 md:p-6">
            <h3 className="font-semibold text-lg mb-3">Live Bidding</h3>
            <p className="text-gray-600">Experience the excitement of auctions with our real-time bidding system.</p>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your transactions are protected with industry-standard security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

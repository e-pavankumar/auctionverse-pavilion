
import { useState, useEffect } from 'react';
import AuctionCard from '../components/AuctionCard';

// Mock data for auctions
const mockAuctions = [
  {
    id: 1,
    title: 'Vintage Mechanical Watch',
    description: 'Rare 1960s Swiss mechanical watch in excellent condition.',
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
  },
  {
    id: 2,
    title: 'Modern Art Painting',
    description: 'Original abstract painting by emerging contemporary artist.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 1200,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    seller: 'ArtGallery101',
    bids: [
      { id: 4, amount: 1200, bidder: 'artlover', timestamp: '2023-01-05T10:00:00Z' },
      { id: 5, amount: 1350, bidder: 'collector', timestamp: '2023-01-06T18:45:00Z' },
    ],
    category: 'Art',
  },
  {
    id: 3,
    title: 'Rare First Edition Book',
    description: 'First edition of a classic novel in mint condition with original dust jacket.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 500,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    seller: 'RareBooks',
    bids: [
      { id: 6, amount: 500, bidder: 'booklover', timestamp: '2023-01-10T09:30:00Z' },
      { id: 7, amount: 575, bidder: 'librarian', timestamp: '2023-01-11T14:20:00Z' },
      { id: 8, amount: 625, bidder: 'collector', timestamp: '2023-01-12T11:05:00Z' },
      { id: 9, amount: 700, bidder: 'booklover', timestamp: '2023-01-13T16:40:00Z' },
    ],
    category: 'Books',
  },
  {
    id: 4,
    title: 'Antique Wooden Desk',
    description: 'Beautifully restored 19th century mahogany writing desk.',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 800,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    seller: 'AntiqueEmporium',
    bids: [
      { id: 10, amount: 800, bidder: 'homedesigner', timestamp: '2023-01-15T13:15:00Z' },
      { id: 11, amount: 900, bidder: 'antiquebuyer', timestamp: '2023-01-16T10:30:00Z' },
    ],
    category: 'Furniture',
  },
  {
    id: 5,
    title: 'Vintage Camera Collection',
    description: 'Set of 5 vintage film cameras from the 1950s-1970s, all in working condition.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 450,
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    seller: 'RetroTech',
    bids: [
      { id: 12, amount: 450, bidder: 'photographer', timestamp: '2023-01-20T15:45:00Z' },
      { id: 13, amount: 525, bidder: 'collector', timestamp: '2023-01-21T09:10:00Z' },
      { id: 14, amount: 600, bidder: 'vintagelover', timestamp: '2023-01-22T11:30:00Z' },
    ],
    category: 'Electronics',
  },
  {
    id: 6,
    title: 'Luxury Wristwatch',
    description: 'Limited edition luxury wristwatch with diamond accents and leather strap.',
    imageUrl: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 3500,
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    seller: 'LuxuryItems',
    bids: [
      { id: 15, amount: 3500, bidder: 'watchcollector', timestamp: '2023-01-25T14:00:00Z' },
      { id: 16, amount: 3750, bidder: 'luxurybuyer', timestamp: '2023-01-26T16:20:00Z' },
      { id: 17, amount: 4000, bidder: 'investor', timestamp: '2023-01-27T10:45:00Z' },
      { id: 18, amount: 4250, bidder: 'watchcollector', timestamp: '2023-01-28T09:30:00Z' },
    ],
    category: 'Watches',
  },
];

const categories = ['All', 'Watches', 'Art', 'Books', 'Furniture', 'Electronics'];

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Simulate loading auctions from API
    setTimeout(() => {
      setAuctions(mockAuctions);
      setLoading(false);
    }, 800);
  }, []);
  
  const filteredAuctions = auctions.filter(auction => {
    const matchesCategory = selectedCategory === 'All' || auction.category === selectedCategory;
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              Discover and Bid on <span className="text-primary">Unique</span> Items
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              A premium online auction platform for collectors, enthusiasts, and treasure hunters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="Search auctions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full sm:w-auto flex-1 max-w-md"
              />
              <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-animation">
                Browse All
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary/60 text-foreground/70 hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Auctions Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-tight">
            {selectedCategory === 'All' ? 'Featured Auctions' : `${selectedCategory} Auctions`}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 rounded-xl bg-muted/40 animate-pulse"></div>
              ))}
            </div>
          ) : filteredAuctions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/60 text-lg">
                No auctions found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
              Ready to List Your Own Items?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of sellers who have successfully auctioned their items on our platform.
            </p>
            <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-animation">
              Start Selling
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

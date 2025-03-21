
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const mockUserBids = [
  {
    id: 1,
    auctionId: 1,
    auctionTitle: 'Vintage Mechanical Watch',
    imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bidAmount: 300,
    timestamp: '2023-01-03T09:15:00Z',
    status: 'winning',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    auctionId: 3,
    auctionTitle: 'Rare First Edition Book',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bidAmount: 700,
    timestamp: '2023-01-13T16:40:00Z',
    status: 'winning',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    auctionId: 5,
    auctionTitle: 'Vintage Camera Collection',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bidAmount: 525,
    timestamp: '2023-01-21T09:10:00Z',
    status: 'outbid',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockUserListings = [
  {
    id: 7,
    title: 'Vintage Record Player',
    description: 'Fully functional vintage record player from the 1970s.',
    imageUrl: 'https://images.unsplash.com/photo-1616680214822-1063herald5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 150,
    currentBid: 220,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: 4,
  },
  {
    id: 8,
    title: 'Handcrafted Ceramic Vase',
    description: 'One-of-a-kind ceramic vase made by a local artisan.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    startingPrice: 75,
    currentBid: 75,
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: 0,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bids');
  const [bids, setBids] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setBids(mockUserBids);
      setListings(mockUserListings);
      setLoading(false);
    }, 800);
  }, []);
  
  const timeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };
  
  const tabs = [
    { id: 'bids', label: 'My Bids' },
    { id: 'listings', label: 'My Listings' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'settings', label: 'Account Settings' },
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start flex-wrap md:flex-nowrap gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-display font-medium">
                      {currentUser?.name || currentUser?.email || 'User'}
                    </h2>
                    <p className="text-sm text-foreground/60">
                      {currentUser?.email || ''}
                    </p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-primary text-white font-medium' 
                          : 'text-foreground/80 hover:bg-secondary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 animate-fade-up">
              {/* My Bids */}
              {activeTab === 'bids' && (
                <div>
                  <h1 className="text-2xl font-display font-bold mb-6 tracking-tight">My Bids</h1>
                  
                  {loading ? (
                    <div className="glass-card rounded-xl p-6">
                      <div className="h-16 w-full bg-muted/40 animate-pulse rounded-lg mb-4"></div>
                      <div className="h-16 w-full bg-muted/40 animate-pulse rounded-lg mb-4"></div>
                      <div className="h-16 w-full bg-muted/40 animate-pulse rounded-lg"></div>
                    </div>
                  ) : bids.length > 0 ? (
                    <div className="glass-card rounded-xl overflow-hidden">
                      {bids.map((bid, index) => (
                        <div 
                          key={bid.id} 
                          className={`flex flex-col sm:flex-row items-start sm:items-center p-4 ${
                            index < bids.length - 1 ? 'border-b border-foreground/10' : ''
                          }`}
                        >
                          <div className="flex items-center flex-1 mb-3 sm:mb-0">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                              <img
                                src={bid.imageUrl}
                                alt={bid.auctionTitle}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-3 min-w-0">
                              <h3 className="font-medium truncate">
                                <Link 
                                  to={`/auction/${bid.auctionId}`}
                                  className="hover:text-primary"
                                >
                                  {bid.auctionTitle}
                                </Link>
                              </h3>
                              <p className="text-sm text-foreground/60">
                                Bid placed: {new Date(bid.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between w-full sm:w-auto">
                            <div className="sm:mr-6">
                              <p className="text-sm text-foreground/60">Your bid</p>
                              <p className="font-semibold text-primary">${bid.bidAmount.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex items-center">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                bid.status === 'winning' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {bid.status === 'winning' ? 'Winning' : 'Outbid'}
                              </div>
                              <div className="ml-3 text-sm text-foreground/60 hidden md:block">
                                {timeLeft(bid.endDate)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl p-8 text-center">
                      <h3 className="text-lg font-medium mb-2">No Bids Yet</h3>
                      <p className="text-foreground/60 mb-6">
                        You haven't placed any bids yet. Start exploring auctions to find items you're interested in.
                      </p>
                      <Link 
                        to="/" 
                        className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 inline-block"
                      >
                        Browse Auctions
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* My Listings */}
              {activeTab === 'listings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-display font-bold tracking-tight">My Listings</h1>
                    <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 button-animation">
                      Create New Listing
                    </button>
                  </div>
                  
                  {loading ? (
                    <div className="glass-card rounded-xl p-6">
                      <div className="h-16 w-full bg-muted/40 animate-pulse rounded-lg mb-4"></div>
                      <div className="h-16 w-full bg-muted/40 animate-pulse rounded-lg mb-4"></div>
                    </div>
                  ) : listings.length > 0 ? (
                    <div className="glass-card rounded-xl overflow-hidden">
                      {listings.map((listing, index) => (
                        <div 
                          key={listing.id} 
                          className={`flex flex-col sm:flex-row items-start sm:items-center p-4 ${
                            index < listings.length - 1 ? 'border-b border-foreground/10' : ''
                          }`}
                        >
                          <div className="flex items-center flex-1 mb-3 sm:mb-0">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                              <img
                                src={listing.imageUrl}
                                alt={listing.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-3 min-w-0">
                              <h3 className="font-medium truncate">
                                <Link 
                                  to={`/auction/${listing.id}`}
                                  className="hover:text-primary"
                                >
                                  {listing.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-foreground/60 truncate">
                                {listing.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between w-full sm:w-auto">
                            <div className="sm:mr-6">
                              <p className="text-sm text-foreground/60">Current bid</p>
                              <p className="font-semibold text-primary">${listing.currentBid.toLocaleString()}</p>
                              <p className="text-xs text-foreground/60">{listing.bids} bids</p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-end sm:items-center">
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                listing.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {listing.status === 'active' ? 'Active' : 'Ended'}
                              </div>
                              <div className="mt-1 sm:mt-0 sm:ml-3 text-sm text-foreground/60">
                                {timeLeft(listing.endDate)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-card rounded-xl p-8 text-center">
                      <h3 className="text-lg font-medium mb-2">No Listings Yet</h3>
                      <p className="text-foreground/60 mb-6">
                        You haven't created any auction listings yet. Start selling by creating your first listing.
                      </p>
                      <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 inline-block">
                        Create New Listing
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Watchlist */}
              {activeTab === 'watchlist' && (
                <div>
                  <h1 className="text-2xl font-display font-bold mb-6 tracking-tight">My Watchlist</h1>
                  
                  <div className="glass-card rounded-xl p-8 text-center">
                    <h3 className="text-lg font-medium mb-2">Watchlist is Empty</h3>
                    <p className="text-foreground/60 mb-6">
                      You haven't added any items to your watchlist yet. Browse auctions and add items to keep track of them.
                    </p>
                    <Link 
                      to="/" 
                      className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 inline-block"
                    >
                      Browse Auctions
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Account Settings */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-2xl font-display font-bold mb-6 tracking-tight">Account Settings</h1>
                  
                  <div className="glass-card rounded-xl p-6 divide-y divide-foreground/10">
                    <div className="pb-6">
                      <h2 className="text-lg font-display font-semibold mb-4">Profile Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            defaultValue={currentUser?.name || ''}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            defaultValue={currentUser?.email || ''}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-6">
                      <h2 className="text-lg font-display font-semibold mb-4">Password</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground/80 mb-1">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-foreground/80 mb-1">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 flex justify-end">
                      <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 button-animation">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      toast.success('Account created successfully');
      navigate('/');
    } catch (err) {
      setError('Failed to create an account');
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Auction<span className="text-primary">Verse</span>
              </h1>
            </Link>
          </div>
          
          <h2 className="text-2xl font-display font-bold tracking-tight mb-2">
            Create your account
          </h2>
          
          <p className="text-foreground/60 mb-8">
            Join AuctionVerse to start bidding on exclusive items
          </p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/80 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 button-animation ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></span>
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden md:block md:flex-1 bg-gradient-to-br from-primary/5 to-primary/20 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md glass-card rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-display font-bold mb-4">Join Our Auction Community</h3>
            <p className="text-foreground/70 mb-4">
              Create an account to access exclusive auctions, track your bids, and connect with other collectors.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/50 backdrop-blur rounded-lg">
                <div className="text-primary text-lg font-semibold mb-1">100+</div>
                <div className="text-sm text-foreground/70">Daily Auctions</div>
              </div>
              <div className="p-3 bg-white/50 backdrop-blur rounded-lg">
                <div className="text-primary text-lg font-semibold mb-1">10k+</div>
                <div className="text-sm text-foreground/70">Active Bidders</div>
              </div>
              <div className="p-3 bg-white/50 backdrop-blur rounded-lg">
                <div className="text-primary text-lg font-semibold mb-1">99%</div>
                <div className="text-sm text-foreground/70">Secure Transactions</div>
              </div>
              <div className="p-3 bg-white/50 backdrop-blur rounded-lg">
                <div className="text-primary text-lg font-semibold mb-1">24/7</div>
                <div className="text-sm text-foreground/70">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

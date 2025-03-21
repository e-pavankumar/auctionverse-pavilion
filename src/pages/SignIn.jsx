
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      toast.success('Successfully signed in');
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      toast.error('Failed to sign in');
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
            Welcome back
          </h2>
          
          <p className="text-foreground/60 mb-8">
            Please sign in to your account to continue
          </p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-foreground/80">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
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
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-foreground/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden md:block md:flex-1 bg-gradient-to-br from-primary/5 to-primary/20 relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md glass-card rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-display font-bold mb-4">Discover Unique Auctions</h3>
            <p className="text-foreground/70 mb-4">
              Join our platform to bid on exclusive items and find rare collectibles that you won't find anywhere else.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['/img1.jpg', '/img2.jpg', '/img3.jpg'].map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/5"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Button, Input, Label } from "../components/ui/form-components";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      toast.success('Successfully signed in');
      navigate('/');
    } catch (err) {
      console.log('Sign in error:', err.message);
      setError(err.message || 'Failed to sign in');
      toast.error(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Auction<span className="text-primary">Verse</span>
              </h1>
            </Link>
          </div>
          
          <h2 className="text-2xl font-display font-bold tracking-tight mb-2">Welcome back</h2>
          <p className="text-foreground/60 mb-8">Please sign in to your account to continue</p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">{error}</div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80">Forgot password?</a>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></span>
                  Signing in...
                </>
              ) : 'Sign in'}
            </Button>
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

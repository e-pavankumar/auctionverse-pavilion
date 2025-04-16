
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Button, Input, Label } from "../components/ui/form-components";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(formData.name, formData.email, formData.password);
      toast.success('Account created successfully');
      navigate('/');
    } catch (err) {
      console.log('Sign up error:', err.message);
      setError(err.message || 'Failed to create account');
      toast.error(err.message || 'Failed to create account');
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
          
          <h2 className="text-2xl font-display font-bold tracking-tight mb-2">Create an account</h2>
          <p className="text-foreground/60 mb-8">Sign up to start bidding on unique items</p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">{error}</div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            
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
              <Label htmlFor="password" className="block text-sm font-medium mb-1">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></span>
                  Creating account...
                </>
              ) : 'Sign up'}
            </Button>
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
            <h3 className="text-xl font-display font-bold mb-4">Join Our Community</h3>
            <p className="text-foreground/70 mb-4">
              Create an account to start bidding, track auctions, and sell your own items on our platform.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['/img4.jpg', '/img5.jpg', '/img6.jpg'].map((img, index) => (
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

export default SignUp;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await signUp(formData.email, formData.password, formData.name);
      toast.success('Account created successfully');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
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
          
          <h2 className="text-2xl font-display font-bold tracking-tight mb-2">Create your account</h2>
          <p className="text-foreground/60 mb-8">Join AuctionVerse to start bidding on exclusive items</p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">{error}</div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
              <div key={field}>
                <Label htmlFor={field} className="block text-sm font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </Label>
                <Input
                  id={field}
                  type={field.includes('assword') ? 'password' : field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="block w-full"
                  placeholder={field.includes('assword') ? '••••••••' : `Your ${field}`}
                />
              </div>
            ))}
            
            <div className="pt-2">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></span>
                    Creating account...
                  </>
                ) : 'Create account'}
              </Button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary hover:text-primary/80 font-medium">Sign in</Link>
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
              {[
                {label: 'Daily Auctions', value: '100+'},
                {label: 'Active Bidders', value: '10k+'},
                {label: 'Secure Transactions', value: '99%'},
                {label: 'Customer Support', value: '24/7'}
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white/50 backdrop-blur rounded-lg">
                  <div className="text-primary text-lg font-semibold mb-1">{item.value}</div>
                  <div className="text-sm text-foreground/70">{item.label}</div>
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

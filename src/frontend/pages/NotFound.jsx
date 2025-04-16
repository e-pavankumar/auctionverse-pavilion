
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="text-center glass-card rounded-xl p-8 max-w-md">
        <div className="text-5xl font-display font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-display font-bold mb-4">Page Not Found</h1>
        <p className="text-foreground/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

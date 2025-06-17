import { Button } from "@/components/ui/button";
import { MapPin, Package, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
              EcoQuick
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/track"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/track"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              Track Package
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/pricing"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/driver"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/driver"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              Become a Driver
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
              asChild
            >
              <Link to="/auth?tab=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

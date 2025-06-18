import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MapPin,
  Package,
  User,
  LogOut,
  Settings,
  BarChart3,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { showSuccessNotification } from "../NotificationSystem";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem("demoUser");
    if (demoUser) {
      setUser(JSON.parse(demoUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("demoUser");
    setUser(null);
    showSuccessNotification(
      "Logged Out",
      "You have been successfully logged out.",
    );
    navigate("/");
  };

  const getDashboardLink = () => {
    if (user?.type === "driver") return "/driver-dashboard";
    if (user?.type === "admin") return "/admin";
    return "/customer-dashboard";
  };

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
              to="/business"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/business"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              For Business
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-brand-violet ${
                location.pathname === "/about"
                  ? "text-brand-violet"
                  : "text-gray-600"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="hidden md:flex">
                  {user.type === "driver"
                    ? "🚗 Driver"
                    : user.type === "admin"
                      ? "⚙️ Admin"
                      : "📦 Customer"}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user.type === "driver" && (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/driver-profile"
                          className="flex items-center"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Package } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                EcoQuick
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              Fast, reliable delivery service connecting customers with verified
              drivers for same-day package delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-brand-orange transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/track"
                  className="hover:text-brand-orange transition-colors"
                >
                  Track Package
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-brand-orange transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-orange transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Business</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/business"
                  className="hover:text-brand-orange transition-colors"
                >
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/api-docs"
                  className="hover:text-brand-orange transition-colors"
                >
                  API Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="hover:text-brand-orange transition-colors"
                >
                  Partner Program
                </Link>
              </li>
              <li>
                <Link
                  to="/insurance-claims"
                  className="hover:text-brand-orange transition-colors"
                >
                  Insurance Claims
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="hover:text-brand-orange transition-colors"
                >
                  Blog & News
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-brand-orange transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-brand-orange transition-colors"
                >
                  Security & Safety
                </Link>
              </li>
              <li>
                <Link
                  to="/driver"
                  className="hover:text-brand-orange transition-colors"
                >
                  Become a Driver
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 EcoQuick. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

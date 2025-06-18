import Layout from "@/components/layout/Layout";
import QuoteCalculator from "@/components/QuoteCalculator";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  Shield,
  MapPin,
  Star,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 py-20 overflow-hidden">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f3f4f6" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-brand-violet/10 to-brand-orange/10 border border-brand-violet/20 mb-6">
                <Package className="w-4 h-4 text-brand-violet mr-2" />
                <span className="text-sm font-medium text-brand-violet">
                  Same-day delivery available
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Fast & Reliable
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  Delivery Service
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Get your packages delivered in 30-60 minutes with our network of
                verified drivers. Track your delivery in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                  asChild
                >
                  <Link to="/auth">Start Delivery</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8"
                  asChild
                >
                  <Link to="/driver">Become a Driver</Link>
                </Button>
              </div>

              {/* Demo Access */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">
                  🚀 Try the Demo
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Experience EcoQuick with our demo accounts - no signup
                  required!
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-700 border-blue-300"
                    asChild
                  >
                    <Link to="/auth">📦 Customer Demo</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-700 border-blue-300"
                    asChild
                  >
                    <Link to="/auth">🚗 Driver Demo</Link>
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl text-brand-violet">
                    10k+
                  </div>
                  <div className="text-gray-600">Deliveries</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-brand-violet">
                    4.9
                  </div>
                  <div className="text-gray-600 flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-brand-violet">
                    500+
                  </div>
                  <div className="text-gray-600">Drivers</div>
                </div>
              </div>
            </div>

            {/* Right Column - Quote Calculator */}
            <div className="relative" id="quote-calculator">
              <QuoteCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EcoQuick?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing delivery with speed, reliability, and
              transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                30-60 minute delivery window. No more waiting around all day for
                your packages.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600">
                Track your driver's location and get updates every step of the
                way.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Insured
              </h3>
              <p className="text-gray-600">
                All deliveries are insured up to $500. Your packages are safe
                with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your package delivered in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Enter Details
              </h3>
              <p className="text-gray-600">
                Tell us pickup and delivery addresses, package size, and weight
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Driver Pickup
              </h3>
              <p className="text-gray-600">
                A verified driver will collect your package and confirm pickup
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Track your package in real-time until it reaches its destination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-violet to-brand-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who trust EcoQuick for their
            delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-brand-violet hover:bg-gray-50 h-12 px-8"
              asChild
            >
              <Link to="/auth">Send a Package</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 h-12 px-8"
              asChild
            >
              <Link to="/driver">Earn as a Driver</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

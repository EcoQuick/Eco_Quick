import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Package,
  MapPin,
  Clock,
  Eye,
  Home,
  Star,
} from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "ECO-2024-001";
  const amount = searchParams.get("amount") || "15.99";
  const [estimatedTime, setEstimatedTime] = useState("");

  useEffect(() => {
    // Calculate estimated delivery time (30-60 minutes from now)
    const now = new Date();
    const estimatedDelivery = new Date(now.getTime() + 45 * 60000); // 45 minutes
    setEstimatedTime(
      estimatedDelivery.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Your delivery has been scheduled and payment processed
              successfully.
            </p>
          </div>

          <div className="space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Details
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Confirmed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order ID and Amount */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order ID
                    </p>
                    <p className="text-sm text-gray-600">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Amount Paid
                    </p>
                    <p className="text-sm text-gray-600">${amount}</p>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      Estimated Delivery Time
                    </p>
                    <p className="text-sm text-blue-700">
                      Today at {estimatedTime} (30-60 minutes)
                    </p>
                  </div>
                </div>

                {/* Sample Addresses */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Pickup Address
                      </p>
                      <p className="text-sm text-gray-600">
                        123 Market St, San Francisco, CA 94102
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-red-600 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Delivery Address
                      </p>
                      <p className="text-sm text-gray-600">
                        456 Valencia St, San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Driver Assignment
                      </p>
                      <p className="text-sm text-gray-600">
                        We're finding the best driver for your delivery (usually
                        within 5 minutes)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Package Pickup
                      </p>
                      <p className="text-sm text-gray-600">
                        Your driver will collect the package from the pickup
                        location
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Real-Time Tracking
                      </p>
                      <p className="text-sm text-gray-600">
                        Track your package in real-time as it makes its way to
                        the destination
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-violet rounded-full flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Delivery</p>
                      <p className="text-sm text-gray-600">
                        Package delivered safely to the destination address
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Info */}
            <Card className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 border-brand-violet/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Stay Updated
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      We'll send you notifications at every step of the delivery
                      process. You can also track your package in real-time
                      using the tracking page.
                    </p>
                    <div className="text-xs text-brand-violet">
                      📧 Email confirmations • 📱 SMS updates • 🔔 Push
                      notifications
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                asChild
              >
                <Link to={`/tracking/${orderId}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Track Your Order
                </Link>
              </Button>

              <Button variant="outline" className="flex-1" asChild>
                <Link to="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>

            {/* Help */}
            <div className="text-center text-sm text-gray-600">
              <p>
                Need help?{" "}
                <Link
                  to="/support"
                  className="text-brand-violet hover:underline"
                >
                  Contact our support team
                </Link>{" "}
                or call{" "}
                <a
                  href="tel:+14155550123"
                  className="text-brand-violet hover:underline"
                >
                  (415) 555-0123
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Package, Clock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get quote data from URL params (in real app would come from state/context)
  const pickupAddress =
    searchParams.get("pickup") || "123 Market St, San Francisco, CA";
  const deliveryAddress =
    searchParams.get("delivery") || "456 Valencia St, San Francisco, CA";
  const packageSize = searchParams.get("size") || "medium";
  const weight = searchParams.get("weight") || "3.5";
  const price = searchParams.get("price") || "15.99";

  const [deliveryTime, setDeliveryTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    instructions: "",
  });

  const handleProceedToPayment = () => {
    // In real app, would validate form and create order
    navigate(`/payment?orderId=ECO-${Date.now()}&amount=${price}`);
  };

  const getPackageDescription = (size: string) => {
    switch (size) {
      case "small":
        return 'Small (up to 12" x 12" x 6")';
      case "medium":
        return 'Medium (up to 18" x 18" x 12")';
      case "large":
        return 'Large (up to 24" x 24" x 18")';
      default:
        return size;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">
              Review your order and provide delivery details
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="lg:order-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Package Details */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {getPackageDescription(packageSize)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Weight: {weight} lbs
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Addresses */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Pickup
                        </p>
                        <p className="text-sm text-gray-600">{pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Delivery
                        </p>
                        <p className="text-sm text-gray-600">
                          {deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base delivery fee</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Package size fee</span>
                      <span>$8.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight fee</span>
                      <span>$2.99</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-violet">${price}</span>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Estimated delivery: 30-60 minutes
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:order-1 space-y-6">
              {/* Delivery Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-time">
                      Preferred delivery time
                    </Label>
                    <Select
                      value={deliveryTime}
                      onValueChange={setDeliveryTime}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">
                          As soon as possible
                        </SelectItem>
                        <SelectItem value="1hour">Within 1 hour</SelectItem>
                        <SelectItem value="2hours">Within 2 hours</SelectItem>
                        <SelectItem value="4hours">Within 4 hours</SelectItem>
                        <SelectItem value="today">Later today</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">
                      Delivery Instructions (Optional)
                    </Label>
                    <Textarea
                      id="instructions"
                      placeholder="Special instructions for the driver (e.g., apartment number, gate code, etc.)"
                      value={customerInfo.instructions}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          instructions: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Continue */}
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  By proceeding, you agree to our{" "}
                  <a
                    href="/terms"
                    className="text-brand-violet hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-brand-violet hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full h-12 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white font-semibold"
                  disabled={
                    !customerInfo.name ||
                    !customerInfo.phone ||
                    !customerInfo.email
                  }
                >
                  Proceed to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

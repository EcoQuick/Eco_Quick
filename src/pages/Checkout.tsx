import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Package,
  Clock,
  User,
  ArrowRight,
  Calendar,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Product categories (matching QuoteCalculator)
const PRODUCT_CATEGORIES = {
  documents: { label: "Documents & Papers", icon: "📄" },
  electronics: { label: "Electronics & Gadgets", icon: "📱" },
  food: { label: "Food & Beverages", icon: "🍔" },
  clothing: { label: "Clothing & Fashion", icon: "👕" },
  books: { label: "Books & Media", icon: "📚" },
  gifts: { label: "Gifts & Flowers", icon: "🎁" },
  medical: { label: "Medical & Health", icon: "⚕️" },
  household: { label: "Household Items", icon: "🏠" },
  other: { label: "Other Items", icon: "📦" },
};

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get quote data from URL params (in real app would come from state/context)
  const pickupAddress =
    searchParams.get("pickup") ||
    "123 High Street, Kingston upon Thames, Surrey KT1 1AA";
  const deliveryAddress =
    searchParams.get("delivery") ||
    "456 London Road, Kingston upon Thames, Surrey KT2 6QL";
  const productCategory = searchParams.get("category") || "documents";
  const weight = searchParams.get("weight") || "";
  const price = searchParams.get("price") || "12.99";
  const driverInstructions = searchParams.get("instructions") || "";

  const [schedulingType, setSchedulingType] = useState("instant");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    instructions: driverInstructions,
  });

  const handleProceedToPayment = () => {
    // In real app, would validate form and create order
    navigate(`/payment?orderId=ECO-${Date.now()}&amount=${price}`);
  };

  const getProductDisplay = (category: string) => {
    const product =
      PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES];
    return product ? `${product.icon} ${product.label}` : `📦 ${category}`;
  };

  const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return "";
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                  {/* Product Details */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center text-lg">
                        {PRODUCT_CATEGORIES[
                          productCategory as keyof typeof PRODUCT_CATEGORIES
                        ]?.icon || "📦"}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {getProductDisplay(productCategory)}
                        </h3>
                        {weight && (
                          <p className="text-sm text-gray-600">
                            Weight: {weight} kg
                          </p>
                        )}
                        {driverInstructions && (
                          <p className="text-sm text-gray-600">
                            Instructions: {driverInstructions}
                          </p>
                        )}
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
                      <span>£6.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Product category fee
                      </span>
                      <span>
                        £
                        {PRODUCT_CATEGORIES[
                          productCategory as keyof typeof PRODUCT_CATEGORIES
                        ]?.label.includes("Medical") ||
                        PRODUCT_CATEGORIES[
                          productCategory as keyof typeof PRODUCT_CATEGORIES
                        ]?.label.includes("Electronics")
                          ? "5.00"
                          : "3.00"}
                      </span>
                    </div>
                    {weight && parseFloat(weight) > 2 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Additional weight fee
                        </span>
                        <span>
                          £{((parseFloat(weight) - 2) * 1.5).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Distance fee</span>
                      <span>£2.40</span>
                    </div>
                    {schedulingType !== "instant" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Scheduled delivery
                        </span>
                        <span>£1.00</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-violet">£{price}</span>
                    </div>
                  </div>

                  {/* Delivery Timeline */}
                  <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                    <Clock className="w-4 h-4 text-green-600" />
                    <div className="text-sm text-green-800">
                      {schedulingType === "instant" ? (
                        <span>Estimated delivery: 30-60 minutes</span>
                      ) : pickupDate && pickupTime ? (
                        <div>
                          <div>
                            Pickup: {formatDateTime(pickupDate, pickupTime)}
                          </div>
                          {dropoffDate && dropoffTime ? (
                            <div>
                              Dropoff:{" "}
                              {formatDateTime(dropoffDate, dropoffTime)}
                            </div>
                          ) : (
                            <div>Dropoff: ~30-45 min after pickup</div>
                          )}
                        </div>
                      ) : (
                        <span>Please select pickup time</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:order-1 space-y-6">
              {/* Flexible Scheduling */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Delivery Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={schedulingType}
                    onValueChange={setSchedulingType}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="instant"
                        className="flex items-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Instant Delivery</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="scheduled"
                        className="flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Delivery</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="instant" className="space-y-4 mt-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-green-600" />
                          <h4 className="font-medium text-green-900">
                            Instant Delivery
                          </h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Your package will be picked up within 15-30 minutes
                          and delivered as quickly as possible.
                        </p>
                        <div className="mt-3 flex items-center space-x-4 text-sm text-green-600">
                          <span>📍 Pickup: Within 30 min</span>
                          <span>🚚 Delivery: 30-60 min total</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="scheduled" className="space-y-4 mt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Pickup Scheduling */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Pickup Time
                          </h4>
                          <div className="space-y-2">
                            <Label htmlFor="pickup-date">Date</Label>
                            <Input
                              id="pickup-date"
                              type="date"
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pickup-time">Time</Label>
                            <Select
                              value={pickupTime}
                              onValueChange={setPickupTime}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                <SelectItem value="16:00">04:00 PM</SelectItem>
                                <SelectItem value="17:00">05:00 PM</SelectItem>
                                <SelectItem value="18:00">06:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Dropoff Scheduling */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Dropoff Time (Optional)
                          </h4>
                          <div className="space-y-2">
                            <Label htmlFor="dropoff-date">Date</Label>
                            <Input
                              id="dropoff-date"
                              type="date"
                              value={dropoffDate}
                              onChange={(e) => setDropoffDate(e.target.value)}
                              min={
                                pickupDate ||
                                new Date().toISOString().split("T")[0]
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dropoff-time">Time</Label>
                            <Select
                              value={dropoffTime}
                              onValueChange={setDropoffTime}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="As soon as possible" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                <SelectItem value="16:00">04:00 PM</SelectItem>
                                <SelectItem value="17:00">05:00 PM</SelectItem>
                                <SelectItem value="18:00">06:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <p className="text-xs text-gray-500">
                            Leave empty for immediate delivery after pickup
                          </p>
                        </div>
                      </div>

                      {/* Scheduled Summary */}
                      {pickupDate && pickupTime && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                          <h5 className="font-medium text-blue-900 mb-2">
                            Scheduled Summary
                          </h5>
                          <div className="text-sm space-y-1">
                            <p className="text-blue-700">
                              📅 Pickup:{" "}
                              {formatDateTime(pickupDate, pickupTime)}
                            </p>
                            {dropoffDate && dropoffTime ? (
                              <p className="text-blue-700">
                                🎯 Dropoff:{" "}
                                {formatDateTime(dropoffDate, dropoffTime)}
                              </p>
                            ) : (
                              <p className="text-blue-700">
                                🎯 Dropoff: As soon as possible after pickup
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
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
                    !customerInfo.email ||
                    (schedulingType === "scheduled" &&
                      (!pickupDate || !pickupTime))
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

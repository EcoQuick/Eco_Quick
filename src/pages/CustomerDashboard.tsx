import Layout from "@/components/layout/Layout";
import OrderCard from "@/components/OrderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Heart,
  Trash2,
  Edit,
} from "lucide-react";
import { mockOrders } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      label: "Home",
      address: "123 Market St, San Francisco, CA 94102",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      address: "456 Mission St, San Francisco, CA 94103",
      isDefault: false,
    },
  ]);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Filter orders based on search query
  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Separate active and completed orders
  const activeOrders = filteredOrders.filter((order) =>
    ["pending", "confirmed", "picked_up", "in_transit"].includes(order.status),
  );
  const completedOrders = filteredOrders.filter((order) =>
    ["delivered", "cancelled"].includes(order.status),
  );

  // Calculate stats
  const totalOrders = mockOrders.length;
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.price, 0);
  const averageDeliveryTime = "42 min"; // Mock average

  // Address management functions
  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      showErrorNotification(
        "Missing Information",
        "Please fill in all required fields.",
      );
      return;
    }

    const fullAddress = `${newAddress.address}, ${newAddress.city}, ${newAddress.state} ${newAddress.zipCode}`;
    const addressToAdd = {
      id: Date.now(),
      label: newAddress.label,
      address: fullAddress,
      isDefault: savedAddresses.length === 0,
    };

    setSavedAddresses([...savedAddresses, addressToAdd]);
    setNewAddress({ label: "", address: "", city: "", state: "", zipCode: "" });
    setIsAddAddressOpen(false);
    showSuccessNotification(
      "Address Added",
      `${newAddress.label} has been saved to your addresses.`,
    );
  };

  const handleDeleteAddress = (addressId: number) => {
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== addressId));
    showSuccessNotification(
      "Address Deleted",
      "Address has been removed from your saved addresses.",
    );
  };

  const handleSetDefault = (addressId: number) => {
    setSavedAddresses(
      savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    );
    showSuccessNotification(
      "Default Address Updated",
      "Your default address has been changed.",
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Your Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your deliveries and track packages
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                  onClick={() => {
                    // Navigate to homepage quote calculator
                    window.location.href = "/#quote-calculator";
                    setTimeout(() => {
                      showSuccessNotification(
                        "Ready to Send",
                        "Fill in your package details below to get started!",
                      );
                    }, 500);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Request Delivery
                </Button>

                {/* Demo Test Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    // Pre-fill test delivery for demo
                    const testParams = new URLSearchParams({
                      pickup: "123 Market St, San Francisco, CA 94102",
                      delivery: "456 Valencia St, San Francisco, CA 94103",
                      size: "medium",
                      weight: "3.5",
                      price: "15.99",
                    });
                    window.location.href = `/checkout?${testParams.toString()}`;
                  }}
                  className="whitespace-nowrap"
                >
                  🧪 Test Checkout
                </Button>
              </div>
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">
              🎯 Demo Account Testing
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              You're using a demo account! Test the full delivery flow:
            </p>
            <div className="text-xs text-blue-600 space-y-1">
              <p>• Use "🧪 Test Checkout" button for instant checkout access</p>
              <p>• Try the quote calculator on the homepage</p>
              <p>
                • Complete the payment flow with test card: 4242 4242 4242 4242
              </p>
              <p>• Track deliveries and test all features</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {totalOrders}
                    </h3>
                    <p className="text-sm text-gray-600">Total Deliveries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ${totalSpent.toFixed(2)}
                    </h3>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {averageDeliveryTime}
                    </h3>
                    <p className="text-sm text-gray-600">Avg. Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
                    <p className="text-sm text-gray-600">Avg. Rating Given</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList>
                    <TabsTrigger value="active">
                      Active Orders ({activeOrders.length})
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      History ({completedOrders.length})
                    </TabsTrigger>
                  </TabsList>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                <TabsContent value="active" className="space-y-6">
                  {activeOrders.length > 0 ? (
                    activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No active deliveries
                        </h3>
                        <p className="text-gray-600 mb-6">
                          You don't have any packages in transit right now
                        </p>
                        <div className="flex flex-col gap-3">
                          <Button
                            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                            onClick={() => {
                              window.location.href = "/#quote-calculator";
                              setTimeout(() => {
                                showSuccessNotification(
                                  "Ready to Send",
                                  "Fill in your package details below to get started!",
                                );
                              }, 500);
                            }}
                          >
                            Send Your First Package
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => {
                              const testParams = new URLSearchParams({
                                pickup:
                                  "123 Market St, San Francisco, CA 94102",
                                delivery:
                                  "456 Valencia St, San Francisco, CA 94103",
                                size: "medium",
                                weight: "3.5",
                                price: "15.99",
                              });
                              window.location.href = `/checkout?${testParams.toString()}`;
                            }}
                          >
                            🧪 Try Demo Checkout
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  {completedOrders.length > 0 ? (
                    completedOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No delivery history
                        </h3>
                        <p className="text-gray-600">
                          Your completed deliveries will appear here
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Saved Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Saved Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {address.label}
                          </span>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.address}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          {!address.isDefault && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSetDefault(address.id)}
                              className="text-xs h-6 px-2"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-xs h-6 px-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Dialog
                    open={isAddAddressOpen}
                    onOpenChange={setIsAddAddressOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="label">Address Label *</Label>
                          <Select
                            value={newAddress.label}
                            onValueChange={(value) =>
                              setNewAddress({ ...newAddress, label: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select address type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Home">🏠 Home</SelectItem>
                              <SelectItem value="Work">🏢 Work</SelectItem>
                              <SelectItem value="Gym">💪 Gym</SelectItem>
                              <SelectItem value="Friend">
                                👨‍👩‍👧‍👦 Friend's Place
                              </SelectItem>
                              <SelectItem value="Other">📍 Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={newAddress.address}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                address: e.target.value,
                              })
                            }
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={newAddress.city}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  city: e.target.value,
                                })
                              }
                              placeholder="San Francisco"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={newAddress.state}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  state: e.target.value,
                                })
                              }
                              placeholder="CA"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                zipCode: e.target.value,
                              })
                            }
                            placeholder="94102"
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsAddAddressOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddAddress}
                            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                          >
                            Add Address
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/track">
                      <Search className="w-4 h-4 mr-2" />
                      Track Any Package
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/support">
                      <Package className="w-4 h-4 mr-2" />
                      Report an Issue
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/settings">
                      <Heart className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Monthly Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deliveries</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Amount Spent</span>
                    <span className="font-medium">$24.98</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">4.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;

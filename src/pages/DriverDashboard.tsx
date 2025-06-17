import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  TrendingUp,
  Package,
  Star,
  Clock,
  MapPin,
  Navigation,
  CheckCircle,
  X,
  Phone,
  User,
} from "lucide-react";
import { mockDriverStats, mockAvailableDeliveries } from "@/lib/mockData";
import { useState } from "react";

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(mockDriverStats.isOnline);
  const [currentTab, setCurrentTab] = useState("available");

  const handleAcceptDelivery = (deliveryId: string) => {
    console.log("Accepting delivery:", deliveryId);
    // In real app, would make API call to accept delivery
  };

  const handleDeclineDelivery = (deliveryId: string) => {
    console.log("Declining delivery:", deliveryId);
    // In real app, would make API call to decline delivery
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
                  Driver Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your deliveries and track earnings
                </p>
              </div>

              {/* Online Status Toggle */}
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <span
                  className={`text-sm font-medium ${
                    isOnline ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-green-600"
                />
                <Badge
                  variant={isOnline ? "default" : "outline"}
                  className={
                    isOnline
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {isOnline ? "Available for deliveries" : "Not accepting"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ${mockDriverStats.totalEarnings.toFixed(2)}
                    </h3>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ${mockDriverStats.weeklyEarnings.toFixed(2)}
                    </h3>
                    <p className="text-sm text-gray-600">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mockDriverStats.completedDeliveries}
                    </h3>
                    <p className="text-sm text-gray-600">Deliveries</p>
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mockDriverStats.rating}
                    </h3>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="available">
                    Available ({mockAvailableDeliveries.length})
                  </TabsTrigger>
                  <TabsTrigger value="active">Active (1)</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                {/* Available Deliveries */}
                <TabsContent value="available" className="space-y-6">
                  {isOnline ? (
                    mockAvailableDeliveries.length > 0 ? (
                      mockAvailableDeliveries.map((delivery) => (
                        <Card
                          key={delivery.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Badge className="bg-green-100 text-green-800">
                                    New Request
                                  </Badge>
                                  <span className="text-lg font-bold text-brand-violet">
                                    {delivery.payout}
                                  </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                  <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-green-600 mt-1" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Pickup
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {delivery.pickupAddress}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-red-600 mt-1" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Delivery
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {delivery.deliveryAddress}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span>📦 {delivery.packageSize}</span>
                                  <span>📍 {delivery.distance}</span>
                                  <span>⏱️ {delivery.estimatedTime}</span>
                                </div>
                              </div>

                              <div className="flex flex-col space-y-2 ml-4">
                                <Button
                                  onClick={() =>
                                    handleAcceptDelivery(delivery.id)
                                  }
                                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Accept
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleDeclineDelivery(delivery.id)
                                  }
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Decline
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="text-center py-12">
                          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No delivery requests
                          </h3>
                          <p className="text-gray-600">
                            New delivery requests will appear here when
                            available
                          </p>
                        </CardContent>
                      </Card>
                    )
                  ) : (
                    <Card>
                      <CardContent className="text-center py-12">
                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          You're offline
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Turn on your availability to start receiving delivery
                          requests
                        </p>
                        <Button
                          onClick={() => setIsOnline(true)}
                          className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                        >
                          Go Online
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Active Delivery */}
                <TabsContent value="active" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Current Delivery</CardTitle>
                        <Badge className="bg-orange-100 text-orange-800">
                          In Transit
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Customer Info */}
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            John Smith
                          </p>
                          <p className="text-sm text-gray-600">Customer</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>

                      {/* Addresses */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-green-600 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Pickup (Completed)
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
                              Delivery Destination
                            </p>
                            <p className="text-sm text-gray-600">
                              456 Valencia St, San Francisco, CA 94103
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Update Buttons */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Update Status
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Picked Up ✓
                          </Button>
                          <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                            <Package className="w-4 h-4 mr-2" />
                            Mark Delivered
                          </Button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          window.open("https://maps.google.com", "_blank")
                        }
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Open in Maps
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Completed Deliveries */}
                <TabsContent value="completed" className="space-y-6">
                  <Card>
                    <CardContent className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No completed deliveries today
                      </h3>
                      <p className="text-gray-600">
                        Your completed deliveries will appear here
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Earnings</span>
                    <span className="font-bold text-green-600">$52.75</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deliveries</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hours Online</span>
                    <span className="font-medium">4.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Miles Driven</span>
                    <span className="font-medium">28.3</span>
                  </div>
                </CardContent>
              </Card>

              {/* Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Earnings Goal</span>
                      <span>$387 / $500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-brand-violet to-brand-orange h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Delivery Goal</span>
                      <span>23 / 30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-brand-violet to-brand-orange h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
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
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Earnings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Check Ratings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Driver Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriverDashboard;

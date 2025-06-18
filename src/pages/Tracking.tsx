import Layout from "@/components/layout/Layout";
import RatingSystem from "@/components/RatingSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Package,
  Clock,
  Phone,
  Star,
  CheckCircle,
  Circle,
  Navigation,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockOrders, DeliveryOrder } from "@/lib/mockData";

const Tracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<DeliveryOrder | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Find order by ID (in real app, would fetch from API)
    const foundOrder = mockOrders.find((o) => o.id === orderId);
    setOrder(foundOrder || mockOrders[0]);

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [orderId]);

  if (!order) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Order Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't find an order with ID: {orderId}
              </p>
              <Button asChild>
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "picked_up":
        return "bg-purple-100 text-purple-800";
      case "in_transit":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Finding Driver";
      case "confirmed":
        return "Driver Assigned";
      case "picked_up":
        return "Package Picked Up";
      case "in_transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Track Order #{order.id}
                </h1>
                <p className="text-gray-600">
                  Real-time delivery tracking and updates
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="lg:order-1">
              <Card className="h-[500px]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Live Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 relative">
                  {/* Placeholder for Map - In production, this would be Mapbox */}
                  <div className="h-[420px] bg-gradient-to-br from-blue-100 to-green-100 relative overflow-hidden">
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 grid-rows-8 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-gray-300"></div>
                        ))}
                      </div>
                    </div>

                    {/* Route Line */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 400 420"
                    >
                      <path
                        d="M80 120 Q200 200 320 300"
                        stroke="#3e0074"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        opacity="0.7"
                      />
                    </svg>

                    {/* Pickup Location */}
                    <div className="absolute top-[120px] left-[80px] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="mt-2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                        Pickup
                      </div>
                    </div>

                    {/* Driver Location */}
                    {order.status === "in_transit" && (
                      <div className="absolute top-[200px] left-[200px] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div className="mt-2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                          Driver Location
                        </div>
                      </div>
                    )}

                    {/* Delivery Location */}
                    <div className="absolute bottom-[120px] right-[80px] transform translate-x-1/2 translate-y-1/2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="mb-2 bg-white px-2 py-1 rounded shadow text-xs font-medium">
                        Delivery
                      </div>
                    </div>

                    {/* ETA Banner */}
                    {order.status === "in_transit" && (
                      <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-brand-violet" />
                            <span className="text-sm font-medium">
                              ETA:{" "}
                              {new Date(
                                order.estimatedDelivery,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <span className="text-xs text-gray-600">
                            ~15 min remaining
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Map Controls */}
                    <div className="absolute bottom-4 right-4 space-y-2">
                      <Button size="sm" variant="outline" className="bg-white">
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Details & Timeline */}
            <div className="lg:order-2 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Addresses */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Pickup
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.pickupAddress}
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
                          {order.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-brand-violet" />
                      <div>
                        <p className="font-medium capitalize">
                          {order.packageSize} Package
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.weight} lbs
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-brand-violet">
                      ${order.price}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Info */}
              {order.driver && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Driver</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.driver.photo}
                        alt={order.driver.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {order.driver.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {order.driver.rating} rating
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`tel:${order.driver.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {event.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              event.completed
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {event.status}
                          </p>
                          <p
                            className={`text-sm ${
                              event.completed
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            {event.description}
                          </p>
                          {event.timestamp && (
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
                {order.status === "delivered" && (
                  <RatingSystem
                    orderId={order.id}
                    driverName={order.driver?.name}
                    driverPhoto={order.driver?.photo}
                    trigger={
                      <Button className="flex-1 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                        Rate Experience
                      </Button>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tracking;

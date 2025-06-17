import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Clock, Eye, Star } from "lucide-react";
import { DeliveryOrder } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: DeliveryOrder;
  variant?: "customer" | "driver";
}

const OrderCard = ({ order, variant = "customer" }: OrderCardProps) => {
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
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "picked_up":
        return "Picked Up";
      case "in_transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">#{order.id}</h3>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Addresses */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Pickup</p>
              <p className="text-sm text-gray-600">{order.pickupAddress}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Delivery</p>
              <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Size:{" "}
              <span className="font-medium capitalize">
                {order.packageSize}
              </span>
            </span>
            <span className="text-gray-600">
              Weight: <span className="font-medium">{order.weight} lbs</span>
            </span>
          </div>
          <span className="font-bold text-brand-violet">${order.price}</span>
        </div>

        {/* Driver Info (for customer view) */}
        {variant === "customer" && order.driver && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={order.driver.photo}
              alt={order.driver.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{order.driver.name}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">
                  {order.driver.rating}
                </span>
              </div>
            </div>
            <a
              href={`tel:${order.driver.phone}`}
              className="text-brand-violet hover:text-brand-violet/80 text-sm font-medium"
            >
              Call
            </a>
          </div>
        )}

        {/* ETA */}
        {order.status === "in_transit" && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              ETA:{" "}
              {new Date(order.estimatedDelivery).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/tracking/${order.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Track Order
            </Link>
          </Button>

          {order.status === "delivered" && variant === "customer" && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
            >
              Rate Driver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

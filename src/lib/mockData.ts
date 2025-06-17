export interface DeliveryOrder {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  packageSize: "small" | "medium" | "large";
  weight: number;
  price: number;
  status:
    | "pending"
    | "confirmed"
    | "picked_up"
    | "in_transit"
    | "delivered"
    | "cancelled";
  createdAt: string;
  estimatedDelivery: string;
  driver?: {
    id: string;
    name: string;
    rating: number;
    photo: string;
    phone: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  timeline: {
    status: string;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

export interface DriverStats {
  totalEarnings: number;
  weeklyEarnings: number;
  completedDeliveries: number;
  rating: number;
  isOnline: boolean;
}

export const mockOrders: DeliveryOrder[] = [
  {
    id: "ECO-2024-001",
    pickupAddress: "123 Market St, San Francisco, CA 94102",
    deliveryAddress: "456 Valencia St, San Francisco, CA 94103",
    packageSize: "medium",
    weight: 3.5,
    price: 15.99,
    status: "in_transit",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-15T11:45:00Z",
    driver: {
      id: "driver-123",
      name: "Sarah Chen",
      rating: 4.9,
      photo: "/api/placeholder/40/40",
      phone: "+1 (415) 555-0123",
      location: {
        lat: 37.7849,
        lng: -122.4094,
      },
    },
    timeline: [
      {
        status: "Order Placed",
        timestamp: "2024-01-15T10:30:00Z",
        description: "Your delivery request has been submitted",
        completed: true,
      },
      {
        status: "Driver Assigned",
        timestamp: "2024-01-15T10:35:00Z",
        description: "Sarah Chen will handle your delivery",
        completed: true,
      },
      {
        status: "Package Picked Up",
        timestamp: "2024-01-15T10:45:00Z",
        description: "Package collected from pickup location",
        completed: true,
      },
      {
        status: "In Transit",
        timestamp: "2024-01-15T10:50:00Z",
        description: "Package is on the way to destination",
        completed: true,
      },
      {
        status: "Delivered",
        timestamp: "",
        description: "Package delivered successfully",
        completed: false,
      },
    ],
  },
  {
    id: "ECO-2024-002",
    pickupAddress: "789 Mission St, San Francisco, CA 94103",
    deliveryAddress: "321 Castro St, San Francisco, CA 94114",
    packageSize: "small",
    weight: 1.2,
    price: 8.99,
    status: "delivered",
    createdAt: "2024-01-14T14:20:00Z",
    estimatedDelivery: "2024-01-14T15:30:00Z",
    timeline: [
      {
        status: "Order Placed",
        timestamp: "2024-01-14T14:20:00Z",
        description: "Your delivery request has been submitted",
        completed: true,
      },
      {
        status: "Driver Assigned",
        timestamp: "2024-01-14T14:25:00Z",
        description: "Mike Rodriguez will handle your delivery",
        completed: true,
      },
      {
        status: "Package Picked Up",
        timestamp: "2024-01-14T14:35:00Z",
        description: "Package collected from pickup location",
        completed: true,
      },
      {
        status: "In Transit",
        timestamp: "2024-01-14T14:40:00Z",
        description: "Package is on the way to destination",
        completed: true,
      },
      {
        status: "Delivered",
        timestamp: "2024-01-14T15:15:00Z",
        description: "Package delivered successfully",
        completed: true,
      },
    ],
  },
];

export const mockDriverStats: DriverStats = {
  totalEarnings: 2847.5,
  weeklyEarnings: 387.25,
  completedDeliveries: 127,
  rating: 4.8,
  isOnline: true,
};

export const mockAvailableDeliveries = [
  {
    id: "pending-001",
    pickupAddress: "555 Market St, San Francisco, CA",
    deliveryAddress: "777 Howard St, San Francisco, CA",
    distance: "2.3 miles",
    payout: "$12.50",
    packageSize: "medium",
    estimatedTime: "25 min",
  },
  {
    id: "pending-002",
    pickupAddress: "123 Folsom St, San Francisco, CA",
    deliveryAddress: "456 Bryant St, San Francisco, CA",
    distance: "1.8 miles",
    payout: "$9.75",
    packageSize: "small",
    estimatedTime: "18 min",
  },
];

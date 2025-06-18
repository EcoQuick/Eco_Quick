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
    pickupAddress: "123 High Street, Kingston upon Thames, Surrey KT1 1AA",
    deliveryAddress: "456 London Road, Kingston upon Thames, Surrey KT2 6QL",
    packageSize: "medium",
    weight: 2.5,
    price: 12.99,
    status: "in_transit",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-15T11:45:00Z",
    driver: {
      id: "driver-123",
      name: "Sarah Thompson",
      rating: 4.9,
      photo: "/api/placeholder/40/40",
      phone: "+44 20 8974 5123",
      location: {
        lat: 51.4085,
        lng: -0.3064,
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
        description: "Sarah Thompson will handle your delivery",
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
    pickupAddress: "789 Portsmouth Road, Surbiton, Surrey KT6 4QU",
    deliveryAddress: "321 Kingston Road, New Malden, Surrey KT3 3AB",
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
        description: "James Wilson will handle your delivery",
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
    pickupAddress: "55 Market Place, Kingston upon Thames, Surrey KT1 1JT",
    deliveryAddress: "77 Coombe Road, Kingston upon Thames, Surrey KT2 7AF",
    distance: "2.1 miles",
    payout: "£11.50",
    packageSize: "medium",
    estimatedTime: "22 min",
  },
  {
    id: "pending-002",
    pickupAddress: "12 The Broadway, Wimbledon, London SW19 1SD",
    deliveryAddress: "45 Raynes Park High Street, London SW20 9DR",
    distance: "1.6 miles",
    payout: "£9.25",
    packageSize: "small",
    estimatedTime: "16 min",
  },
  {
    id: "pending-003",
    pickupAddress: "34 Church Street, Kingston upon Thames, Surrey KT1 1RJ",
    deliveryAddress: "67 Victoria Drive, Surbiton, Surrey KT6 5NY",
    distance: "2.8 miles",
    payout: "£13.75",
    packageSize: "large",
    estimatedTime: "28 min",
  },
];

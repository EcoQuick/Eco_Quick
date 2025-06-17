import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Package, CheckCircle, AlertCircle, Clock } from "lucide-react";

export interface Notification {
  id: string;
  type:
    | "order_update"
    | "payment_confirmation"
    | "driver_assigned"
    | "delivery_completed";
  title: string;
  message: string;
  timestamp: Date;
  orderId?: string;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate real-time notifications (in production, would use WebSocket/SSE)
  useEffect(() => {
    const simulateNotifications = () => {
      const sampleNotifications: Notification[] = [
        {
          id: "notif-1",
          type: "driver_assigned",
          title: "Driver Assigned",
          message: "Sarah Chen will handle your delivery #ECO-2024-001",
          timestamp: new Date(),
          orderId: "ECO-2024-001",
        },
        {
          id: "notif-2",
          type: "order_update",
          title: "Package Picked Up",
          message: "Your package has been collected and is on the way",
          timestamp: new Date(),
          orderId: "ECO-2024-001",
        },
      ];

      // Show notifications with delay to simulate real-time updates
      sampleNotifications.forEach((notification, index) => {
        setTimeout(
          () => {
            showNotification(notification);
            setNotifications((prev) => [...prev, notification]);
          },
          (index + 1) * 3000,
        );
      });
    };

    // Simulate notifications after 5 seconds
    const timer = setTimeout(simulateNotifications, 5000);
    return () => clearTimeout(timer);
  }, []);

  const showNotification = (notification: Notification) => {
    const getIcon = () => {
      switch (notification.type) {
        case "driver_assigned":
          return <Package className="w-5 h-5" />;
        case "order_update":
          return <Clock className="w-5 h-5" />;
        case "delivery_completed":
          return <CheckCircle className="w-5 h-5" />;
        case "payment_confirmation":
          return <CheckCircle className="w-5 h-5" />;
        default:
          return <AlertCircle className="w-5 h-5" />;
      }
    };

    const getColor = () => {
      switch (notification.type) {
        case "driver_assigned":
          return "text-blue-600";
        case "order_update":
          return "text-orange-600";
        case "delivery_completed":
          return "text-green-600";
        case "payment_confirmation":
          return "text-green-600";
        default:
          return "text-gray-600";
      }
    };

    toast(notification.title, {
      description: notification.message,
      icon: <div className={getColor()}>{getIcon()}</div>,
      action: notification.orderId
        ? {
            label: "Track Order",
            onClick: () =>
              window.open(`/tracking/${notification.orderId}`, "_blank"),
          }
        : undefined,
      duration: 6000,
    });
  };

  // Function to manually trigger notifications (for demo purposes)
  const triggerSampleNotification = (type: Notification["type"]) => {
    const sampleMessages = {
      driver_assigned: {
        title: "Driver Assigned",
        message: "Mike Rodriguez will handle your delivery",
      },
      order_update: {
        title: "Order Update",
        message: "Your package is now in transit",
      },
      delivery_completed: {
        title: "Delivery Completed",
        message: "Your package has been delivered successfully",
      },
      payment_confirmation: {
        title: "Payment Confirmed",
        message: "Your payment of $15.99 has been processed",
      },
    };

    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type,
      title: sampleMessages[type].title,
      message: sampleMessages[type].message,
      timestamp: new Date(),
      orderId: "ECO-2024-001",
    };

    showNotification(notification);
    setNotifications((prev) => [...prev, notification]);
  };

  // Expose function globally for demo purposes
  useEffect(() => {
    (window as any).triggerNotification = triggerSampleNotification;
  }, []);

  return null; // This component doesn't render anything, just manages notifications
};

export default NotificationSystem;

// Helper function to show success notifications
export const showSuccessNotification = (title: string, message: string) => {
  toast.success(title, {
    description: message,
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
  });
};

// Helper function to show error notifications
export const showErrorNotification = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
  });
};

// Helper function to show info notifications
export const showInfoNotification = (title: string, message: string) => {
  toast(title, {
    description: message,
    icon: <Package className="w-5 h-5 text-blue-600" />,
  });
};

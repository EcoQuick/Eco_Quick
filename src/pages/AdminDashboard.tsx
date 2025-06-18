import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Car,
  Star,
  Activity,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock admin data
  const stats = {
    totalUsers: 1247,
    activeDrivers: 89,
    totalDeliveries: 5429,
    revenue: 67842.5,
    pendingOrders: 23,
    completedToday: 156,
  };

  const recentOrders = [
    {
      id: "ECO-2024-001",
      customer: "John Smith",
      driver: "Sarah Chen",
      status: "in_transit",
      amount: 15.99,
      time: "10 min ago",
    },
    {
      id: "ECO-2024-002",
      customer: "Alice Johnson",
      driver: "Mike Rodriguez",
      status: "delivered",
      amount: 22.45,
      time: "25 min ago",
    },
    {
      id: "ECO-2024-003",
      customer: "Bob Wilson",
      driver: "Lisa Wang",
      status: "pending",
      amount: 8.99,
      time: "1 hour ago",
    },
  ];

  const systemHealth = {
    apiStatus: "healthy",
    databaseStatus: "healthy",
    paymentGateway: "healthy",
    mapService: "healthy",
    notifications: "degraded",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-yellow-100 text-yellow-800";
      case "down":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor system performance and manage operations
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.totalUsers.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.activeDrivers}
                    </h3>
                    <p className="text-sm text-gray-600">Active Drivers</p>
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
                      {stats.totalDeliveries.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">Total Deliveries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      ${stats.revenue.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="orders" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Recent Orders</span>
                        <div className="flex space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {stats.pendingOrders} Pending
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {stats.completedToday} Today
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div>
                              <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-900">
                                  #{order.id}
                                </span>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {order.customer} → {order.driver}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                ${order.amount}
                              </p>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="drivers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Driver Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              89
                            </div>
                            <div className="text-sm text-green-700">Online</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-600">
                              34
                            </div>
                            <div className="text-sm text-gray-700">Offline</div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              12
                            </div>
                            <div className="text-sm text-blue-700">
                              Pending Approval
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button>Manage Drivers</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-brand-violet">
                              4.8
                            </div>
                            <div className="text-sm text-gray-600 flex items-center justify-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              Average Rating
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-brand-violet">
                              96%
                            </div>
                            <div className="text-sm text-gray-600">
                              On-time Rate
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            Platform performance is excellent with high customer
                            satisfaction scores.
                          </p>
                          <Button variant="outline">View Full Analytics</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(systemHealth).map(([service, status]) => (
                    <div
                      key={service}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {service.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <Badge className={getHealthColor(status)}>
                        {status === "healthy" && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {status === "degraded" && (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {status === "down" && (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    View All Orders
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Financial Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Support Tickets
                  </Button>
                </CardContent>
              </Card>

              {/* Daily Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">New Orders</span>
                    <span className="font-medium">178</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-medium">$2,847.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">New Drivers</span>
                    <span className="font-medium">3</span>
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

export default AdminDashboard;

import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Settings,
  Percent,
  Plus,
  Edit3,
  Trash2,
  BarChart3,
  Calendar,
  MapPin,
  CreditCard,
  Eye,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const AdminDashboard = () => {
  // Enhanced admin data
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeDrivers: 89,
    totalDeliveries: 5429,
    revenue: 67842.5,
    pendingOrders: 23,
    completedToday: 156,
    growthRate: 12.5,
    avgOrderValue: 14.8,
    customerSatisfaction: 4.8,
    driverUtilization: 78,
  });

  // Pricing Management State
  const [pricingRules, setPricingRules] = useState([
    {
      id: "base-delivery",
      name: "Base Delivery Fee",
      value: 6.0,
      type: "fixed",
      description: "Standard delivery fee for all orders",
      active: true,
    },
    {
      id: "distance-rate",
      name: "Distance Rate",
      value: 0.8,
      type: "per_mile",
      description: "Cost per mile within service area",
      active: true,
    },
    {
      id: "weight-premium",
      name: "Weight Premium",
      value: 1.5,
      type: "per_kg",
      description: "Additional cost per kg over 2kg",
      active: true,
    },
    {
      id: "medical-premium",
      name: "Medical Items Premium",
      value: 2.0,
      type: "fixed",
      description: "Premium for medical/pharmaceutical deliveries",
      active: true,
    },
    {
      id: "electronics-premium",
      name: "Electronics Premium",
      value: 2.0,
      type: "fixed",
      description: "Premium for electronics and fragile items",
      active: true,
    },
    {
      id: "scheduled-delivery",
      name: "Scheduled Delivery Fee",
      value: 1.0,
      type: "fixed",
      description: "Additional fee for non-instant deliveries",
      active: true,
    },
  ]);

  // Coupon Management State
  const [coupons, setCoupons] = useState([
    {
      id: "WELCOME10",
      code: "WELCOME10",
      description: "Welcome discount for new customers",
      discountType: "percentage",
      discountValue: 10,
      minOrderValue: 15,
      maxDiscount: 5,
      usageLimit: 1000,
      usedCount: 247,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      active: true,
      applicableCategories: "all",
    },
    {
      id: "MEDICAL15",
      code: "MEDICAL15",
      description: "Discount on medical deliveries",
      discountType: "percentage",
      discountValue: 15,
      minOrderValue: 10,
      maxDiscount: 10,
      usageLimit: 500,
      usedCount: 89,
      validFrom: "2024-01-01",
      validTo: "2024-06-30",
      active: true,
      applicableCategories: "medical",
    },
    {
      id: "STUDENT5",
      code: "STUDENT5",
      description: "Student discount",
      discountType: "fixed",
      discountValue: 5,
      minOrderValue: 20,
      maxDiscount: 5,
      usageLimit: 2000,
      usedCount: 156,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      active: true,
      applicableCategories: "books,documents",
    },
  ]);

  // Revenue Analytics
  const revenueAnalytics = {
    daily: {
      today: 2847.5,
      yesterday: 2654.2,
      change: 7.3,
    },
    weekly: {
      thisWeek: 18420.4,
      lastWeek: 16834.7,
      change: 9.4,
    },
    monthly: {
      thisMonth: 67842.5,
      lastMonth: 59673.2,
      change: 13.7,
    },
    categoryBreakdown: [
      { category: "Electronics", revenue: 18420.5, percentage: 27.1 },
      { category: "Food", revenue: 15632.8, percentage: 23.0 },
      { category: "Medical", revenue: 12456.3, percentage: 18.4 },
      { category: "Documents", revenue: 8934.2, percentage: 13.2 },
      { category: "Gifts", revenue: 7245.6, percentage: 10.7 },
      { category: "Other", revenue: 5153.1, percentage: 7.6 },
    ],
  };

  // System Health State
  const [systemHealth, setSystemHealth] = useState({
    apiStatus: "healthy",
    databaseStatus: "healthy",
    paymentGateway: "healthy",
    mapService: "healthy",
    notifications: "degraded",
    orderProcessing: "healthy",
    driverTracking: "healthy",
  });

  // Recent Orders
  const recentOrders = [
    {
      id: "ECO-2024-001",
      customer: "John Smith",
      driver: "Sarah Thompson",
      status: "in_transit",
      amount: 15.99,
      time: "10 min ago",
      category: "electronics",
      location: "Kingston upon Thames",
    },
    {
      id: "ECO-2024-002",
      customer: "Alice Johnson",
      driver: "James Wilson",
      status: "delivered",
      amount: 22.45,
      time: "25 min ago",
      category: "food",
      location: "Surbiton",
    },
    {
      id: "ECO-2024-003",
      customer: "Bob Wilson",
      driver: "Lisa Wang",
      status: "pending",
      amount: 8.99,
      time: "1 hour ago",
      category: "documents",
      location: "New Malden",
    },
  ];

  // Dialog states
  const [editPricingDialog, setEditPricingDialog] = useState(false);
  const [editCouponDialog, setEditCouponDialog] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Form states
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    usageLimit: 100,
    validFrom: "",
    validTo: "",
    applicableCategories: "all",
  });

  const handleUpdatePricing = (id: string, newValue: number) => {
    setPricingRules((rules) =>
      rules.map((rule) =>
        rule.id === id ? { ...rule, value: newValue } : rule,
      ),
    );
    showSuccessNotification(
      "Pricing Updated",
      "Pricing rule has been updated successfully.",
    );
  };

  const handleTogglePricing = (id: string) => {
    setPricingRules((rules) =>
      rules.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule,
      ),
    );
  };

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.description) {
      showErrorNotification(
        "Validation Error",
        "Code and description are required.",
      );
      return;
    }

    const coupon = {
      id: newCoupon.code,
      ...newCoupon,
      usedCount: 0,
      active: true,
    };

    setCoupons((prev) => [...prev, coupon]);
    setNewCoupon({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minOrderValue: 0,
      maxDiscount: 0,
      usageLimit: 100,
      validFrom: "",
      validTo: "",
      applicableCategories: "all",
    });
    setEditCouponDialog(false);
    showSuccessNotification(
      "Coupon Created",
      "New coupon has been created successfully.",
    );
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
    showSuccessNotification(
      "Coupon Deleted",
      "Coupon has been removed successfully.",
    );
  };

  const handleToggleCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === couponId ? { ...coupon, active: !coupon.active } : coupon,
      ),
    );
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
              Comprehensive system monitoring and management
            </p>
          </div>

          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      £{stats.revenue.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">
                        +{stats.growthRate}%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.totalDeliveries.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">Total Deliveries</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats.completedToday} today
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.activeDrivers}
                    </h3>
                    <p className="text-sm text-gray-600">Active Drivers</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stats.driverUtilization}% utilization
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stats.customerSatisfaction}
                    </h3>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-xs text-gray-500 mt-1">
                      £{stats.avgOrderValue} avg order
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="coupons">Coupons</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitor</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* Recent Orders */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Recent Orders</span>
                          <div className="flex space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800">
                              {stats.pendingOrders} Pending
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Filter className="w-4 h-4 mr-2" />
                              Filter
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentOrders.map((order) => (
                            <div
                              key={order.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="font-medium text-gray-900">
                                    #{order.id}
                                  </span>
                                  <Badge
                                    className={getStatusColor(order.status)}
                                  >
                                    {order.status.replace("_", " ")}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {order.category}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                  <p>Customer: {order.customer}</p>
                                  <p>Driver: {order.driver}</p>
                                  <p className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {order.location}
                                  </p>
                                  <p className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {order.time}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="font-bold text-gray-900 text-lg">
                                  £{order.amount}
                                </p>
                                <div className="flex space-x-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      showSuccessNotification(
                                        "Order Tracking",
                                        `Viewing real-time location for order #${order.id}`,
                                      );
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      showSuccessNotification(
                                        "Order Details",
                                        `Opening detailed view for order #${order.id} - ${order.customer}`,
                                      );
                                    }}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Revenue Analytics Tab */}
                <TabsContent value="revenue">
                  <div className="space-y-6">
                    {/* Revenue Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900">
                              £{revenueAnalytics.daily.today.toLocaleString()}
                            </h3>
                            <p className="text-sm text-gray-600">Today</p>
                            <div className="flex items-center justify-center mt-1">
                              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                              <span className="text-xs text-green-600">
                                +{revenueAnalytics.daily.change}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900">
                              £
                              {revenueAnalytics.weekly.thisWeek.toLocaleString()}
                            </h3>
                            <p className="text-sm text-gray-600">This Week</p>
                            <div className="flex items-center justify-center mt-1">
                              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                              <span className="text-xs text-green-600">
                                +{revenueAnalytics.weekly.change}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900">
                              £
                              {revenueAnalytics.monthly.thisMonth.toLocaleString()}
                            </h3>
                            <p className="text-sm text-gray-600">This Month</p>
                            <div className="flex items-center justify-center mt-1">
                              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                              <span className="text-xs text-green-600">
                                +{revenueAnalytics.monthly.change}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Category Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Revenue by Category</span>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {revenueAnalytics.categoryBreakdown.map(
                            (category, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                      {category.category}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      £{category.revenue.toLocaleString()} (
                                      {category.percentage}%)
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-brand-violet to-brand-orange h-2 rounded-full"
                                      style={{
                                        width: `${category.percentage}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Pricing Management Tab */}
                <TabsContent value="pricing">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Settings className="w-5 h-5 mr-2" />
                          Pricing Management
                        </div>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Rule
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pricingRules.map((rule) => (
                          <div
                            key={rule.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-gray-900">
                                  {rule.name}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {rule.type}
                                </Badge>
                                <Switch
                                  checked={rule.active}
                                  onCheckedChange={() =>
                                    handleTogglePricing(rule.id)
                                  }
                                />
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {rule.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Label className="text-xs">Value:</Label>
                                  <Input
                                    type="number"
                                    value={rule.value}
                                    onChange={(e) =>
                                      handleUpdatePricing(
                                        rule.id,
                                        parseFloat(e.target.value),
                                      )
                                    }
                                    className="w-20 h-8 text-sm"
                                    step="0.1"
                                    min="0"
                                  />
                                  <span className="text-xs text-gray-500">
                                    {rule.type === "fixed"
                                      ? "£"
                                      : rule.type === "per_mile"
                                        ? "£/mile"
                                        : rule.type === "per_kg"
                                          ? "£/kg"
                                          : "£"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Coupon Management Tab */}
                <TabsContent value="coupons">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Percent className="w-5 h-5 mr-2" />
                          Coupon Management
                        </div>
                        <Dialog
                          open={editCouponDialog}
                          onOpenChange={setEditCouponDialog}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Create Coupon
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Create New Coupon</DialogTitle>
                              <DialogDescription>
                                Set up a new coupon code for customer discounts
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Coupon Code</Label>
                                <Input
                                  placeholder="e.g., SAVE20"
                                  value={newCoupon.code}
                                  onChange={(e) =>
                                    setNewCoupon({
                                      ...newCoupon,
                                      code: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  placeholder="Describe the coupon..."
                                  value={newCoupon.description}
                                  onChange={(e) =>
                                    setNewCoupon({
                                      ...newCoupon,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Select
                                    value={newCoupon.discountType}
                                    onValueChange={(value) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        discountType: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="percentage">
                                        Percentage
                                      </SelectItem>
                                      <SelectItem value="fixed">
                                        Fixed Amount
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Value</Label>
                                  <Input
                                    type="number"
                                    placeholder="10"
                                    value={newCoupon.discountValue}
                                    onChange={(e) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        discountValue: parseFloat(
                                          e.target.value,
                                        ),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Min Order Value</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={newCoupon.minOrderValue}
                                    onChange={(e) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        minOrderValue: parseFloat(
                                          e.target.value,
                                        ),
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Usage Limit</Label>
                                  <Input
                                    type="number"
                                    placeholder="100"
                                    value={newCoupon.usageLimit}
                                    onChange={(e) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        usageLimit: parseInt(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Valid From</Label>
                                  <Input
                                    type="date"
                                    value={newCoupon.validFrom}
                                    onChange={(e) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        validFrom: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Valid To</Label>
                                  <Input
                                    type="date"
                                    value={newCoupon.validTo}
                                    onChange={(e) =>
                                      setNewCoupon({
                                        ...newCoupon,
                                        validTo: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setEditCouponDialog(false)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleCreateCoupon}>
                                  Create Coupon
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            className="flex items-start justify-between p-4 border rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <code className="font-mono font-bold text-brand-violet bg-gray-100 px-2 py-1 rounded">
                                  {coupon.code}
                                </code>
                                <Badge
                                  variant={
                                    coupon.active ? "default" : "secondary"
                                  }
                                >
                                  {coupon.active ? "Active" : "Inactive"}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {coupon.discountType}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">
                                {coupon.description}
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                                <span>
                                  Discount:{" "}
                                  {coupon.discountType === "percentage"
                                    ? `${coupon.discountValue}%`
                                    : `£${coupon.discountValue}`}
                                </span>
                                <span>Min: £{coupon.minOrderValue}</span>
                                <span>
                                  Used: {coupon.usedCount}/{coupon.usageLimit}
                                </span>
                                <span>
                                  Valid: {coupon.validFrom} to {coupon.validTo}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Switch
                                checked={coupon.active}
                                onCheckedChange={() =>
                                  handleToggleCoupon(coupon.id)
                                }
                              />
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCoupon(coupon.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* System Monitoring Tab */}
                <TabsContent value="monitoring">
                  <div className="space-y-6">
                    {/* System Health */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          System Health Monitor
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(systemHealth).map(
                            ([service, status]) => (
                              <div
                                key={service}
                                className="flex items-center justify-between p-3 border rounded"
                              >
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                  {service.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <Badge className={getHealthColor(status)}>
                                  {status === "healthy" && (
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                  )}
                                  {status !== "healthy" && (
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                  )}
                                  {status}
                                </Badge>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded">
                            <div className="text-2xl font-bold text-green-600">
                              96%
                            </div>
                            <div className="text-sm text-gray-600">Uptime</div>
                          </div>
                          <div className="text-center p-4 border rounded">
                            <div className="text-2xl font-bold text-blue-600">
                              1.2s
                            </div>
                            <div className="text-sm text-gray-600">
                              Avg Response
                            </div>
                          </div>
                          <div className="text-center p-4 border rounded">
                            <div className="text-2xl font-bold text-purple-600">
                              99.7%
                            </div>
                            <div className="text-sm text-gray-600">
                              Success Rate
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
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
                    <span className="font-medium">£2,847.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Active Coupons
                    </span>
                    <span className="font-medium">
                      {coupons.filter((c) => c.active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Avg Order Value
                    </span>
                    <span className="font-medium">£{stats.avgOrderValue}</span>
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
                    className="w-full justify-start"
                    onClick={() => {
                      // Switch to revenue tab to show analytics
                      const revenueTab = document.querySelector(
                        '[value="revenue"]',
                      ) as HTMLElement;
                      if (revenueTab) revenueTab.click();
                      showSuccessNotification(
                        "Analytics Report",
                        "Switched to revenue analytics view.",
                      );
                    }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      showSuccessNotification(
                        "User Management",
                        "User management interface would open here. Feature coming soon!",
                      );
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      showSuccessNotification(
                        "Driver Approvals",
                        `${Math.floor(Math.random() * 5) + 3} driver applications pending review.`,
                      );
                    }}
                  >
                    <Car className="w-4 h-4 mr-2" />
                    Driver Approvals
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      showErrorNotification(
                        "Payment Issues",
                        `${Math.floor(Math.random() * 8) + 2} payment issues detected. Reviewing failed transactions.`,
                      );
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Issues
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const ticketCount = Math.floor(Math.random() * 12) + 5;
                      showSuccessNotification(
                        "Support Tickets",
                        `${ticketCount} open support tickets. Click to view ticket queue.`,
                      );
                    }}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Support Tickets
                  </Button>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-800">
                        Notification service degraded
                      </span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Some notifications may be delayed
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        All systems operational
                      </span>
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

export default AdminDashboard;

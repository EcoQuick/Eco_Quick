import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  MapPin,
  Trash2,
  Plus,
  Edit,
  Mail,
  Phone,
  Lock,
  Car,
  Star,
  DollarSign,
  FileText,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  showSuccessNotification,
  showDriverNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const AccountSettings = () => {
  // Detect user type (in production, get from auth context/API)
  const [userType, setUserType] = useState<"customer" | "driver">(() => {
    // Check localStorage for demo user type
    const demoUser = localStorage.getItem("demoUser");
    const driverData =
      localStorage.getItem("approvedDriver") ||
      localStorage.getItem("pendingDriverApplication");

    if (demoUser) {
      const user = JSON.parse(demoUser);
      return user.type === "driver" ? "driver" : "customer";
    } else if (driverData) {
      return "driver";
    } else {
      return "customer";
    }
  });

  const [personalInfo, setPersonalInfo] = useState(() => {
    if (userType === "driver") {
      return {
        firstName: "Sarah",
        lastName: "Thompson",
        email: "sarah.thompson@ecoquick.com",
        phone: "+44 20 8974 5123",
        dateOfBirth: "1990-05-15",
        address: "45 Kingston Road",
        city: "Kingston upon Thames",
        county: "Surrey",
        postcode: "KT1 2PX",
      };
    } else {
      return {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phone: "+44 20 8974 0123",
        address: "123 High Street",
        city: "Kingston upon Thames",
        county: "Surrey",
        postcode: "KT1 1AA",
      };
    }
  });

  // Driver-specific information
  const [driverInfo, setDriverInfo] = useState({
    licenseNumber: "SMITH123456789",
    vehicleType: "bicycle",
    vehicleMake: "Trek",
    vehicleModel: "FX 3",
    vehicleYear: "2023",
    vehicleColor: "Blue",
    licensePlate: "N/A",
    insuranceCompany: "Cycle Guard",
    isOnline: true,
    workingHours: {
      monday: { start: "09:00", end: "18:00", working: true },
      tuesday: { start: "09:00", end: "18:00", working: true },
      wednesday: { start: "09:00", end: "18:00", working: true },
      thursday: { start: "09:00", end: "18:00", working: true },
      friday: { start: "09:00", end: "18:00", working: true },
      saturday: { start: "10:00", end: "16:00", working: true },
      sunday: { start: "12:00", end: "16:00", working: false },
    },
  });

  // Driver earnings and stats
  const [driverStats, setDriverStats] = useState({
    totalEarnings: 2847.5,
    weeklyEarnings: 387.25,
    monthlyEarnings: 1654.8,
    completedDeliveries: 127,
    rating: 4.8,
    onTimeRate: 96,
    totalHours: 245,
    avgHourlyRate: 11.6,
  });

  const [notifications, setNotifications] = useState(() => {
    if (userType === "driver") {
      return {
        // Driver-specific notifications
        newDeliveryRequests: true,
        earningsUpdates: true,
        scheduleChanges: true,
        systemAnnouncements: true,
        trainingReminders: true,
        weatherAlerts: true,
        // Communication channels
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
      };
    } else {
      return {
        // Customer notifications
        orderUpdates: true,
        promotions: false,
        driverUpdates: true,
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
      };
    }
  });

  const [privacy, setPrivacy] = useState(() => {
    if (userType === "driver") {
      return {
        shareLocation: true, // Required for driver tracking
        shareEarnings: false,
        shareRatings: true,
        allowMarketing: false,
        dataSharing: false,
        profileVisibility: true,
      };
    } else {
      return {
        shareLocation: true,
        allowMarketing: false,
        dataSharing: false,
      };
    }
  });

  const savedAddresses =
    userType === "driver"
      ? [
          {
            id: 1,
            label: "Home",
            address: "45 Kingston Road, Kingston upon Thames, Surrey KT1 2PX",
            isDefault: true,
          },
        ]
      : [
          {
            id: 1,
            label: "Home",
            address: "123 High Street, Kingston upon Thames, Surrey KT1 1AA",
            isDefault: true,
          },
          {
            id: 2,
            label: "Office",
            address: "456 London Road, Kingston upon Thames, Surrey KT2 6QL",
            isDefault: false,
          },
        ];

  // Payment methods for customers, bank details for drivers
  const paymentMethods =
    userType === "driver"
      ? [
          {
            id: 1,
            type: "bank",
            bankName: "Barclays",
            accountNumber: "****1234",
            sortCode: "20-00-00",
            isDefault: true,
          },
        ]
      : [
          {
            id: 1,
            type: "visa",
            last4: "4242",
            expiry: "12/25",
            isDefault: true,
          },
          {
            id: 2,
            type: "mastercard",
            last4: "8888",
            expiry: "09/26",
            isDefault: false,
          },
        ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your account preferences and information
            </p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList
              className={`grid w-full ${userType === "driver" ? "grid-cols-6" : "grid-cols-5"}`}
            >
              <TabsTrigger value="personal">Personal</TabsTrigger>
              {userType === "driver" && (
                <TabsTrigger value="driver">Driver Info</TabsTrigger>
              )}
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">
                {userType === "driver" ? "Banking" : "Payment"}
              </TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </div>
                    <Badge
                      variant={userType === "driver" ? "default" : "outline"}
                    >
                      {userType === "driver" ? "🚗 Driver" : "👤 Customer"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={personalInfo.firstName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={personalInfo.lastName}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              email: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={personalInfo.phone}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              phone: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Additional fields for drivers */}
                    {userType === "driver" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                dateOfBirth: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postcode">Postcode</Label>
                          <Input
                            id="postcode"
                            value={personalInfo.postcode}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                postcode: e.target.value,
                              })
                            }
                            placeholder="KT1 2PX"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {userType === "driver" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          Driver Status
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">
                              {driverStats.rating}
                            </div>
                            <div className="text-sm text-gray-600">Rating</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">
                              {driverStats.completedDeliveries}
                            </div>
                            <div className="text-sm text-gray-600">
                              Deliveries
                            </div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <DollarSign className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold">
                              £{driverStats.totalEarnings}
                            </div>
                            <div className="text-sm text-gray-600">
                              Total Earned
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Password & Security
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Password</p>
                        <p className="text-sm text-gray-600">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button variant="outline">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                      onClick={() =>
                        showSuccessNotification(
                          "Settings Updated",
                          "Your personal information has been saved successfully.",
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Driver Information Tab */}
            {userType === "driver" && (
              <TabsContent value="driver">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Driver Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Vehicle Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Vehicle Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="vehicleType">Vehicle Type</Label>
                          <Select
                            value={driverInfo.vehicleType}
                            onValueChange={(value) =>
                              setDriverInfo({
                                ...driverInfo,
                                vehicleType: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bicycle">
                                🚴‍♂️ Bicycle
                              </SelectItem>
                              <SelectItem value="electric_scooter">
                                🛴 Electric Scooter
                              </SelectItem>
                              <SelectItem value="electric_car">
                                🔋 Electric Car
                              </SelectItem>
                              <SelectItem value="hybrid">
                                ⚡ Hybrid Car
                              </SelectItem>
                              <SelectItem value="electric_motorcycle">
                                🏍️ Electric Motorcycle
                              </SelectItem>
                              <SelectItem value="car">
                                🚗 Conventional Car
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicleMake">Make</Label>
                          <Input
                            id="vehicleMake"
                            value={driverInfo.vehicleMake}
                            onChange={(e) =>
                              setDriverInfo({
                                ...driverInfo,
                                vehicleMake: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicleModel">Model</Label>
                          <Input
                            id="vehicleModel"
                            value={driverInfo.vehicleModel}
                            onChange={(e) =>
                              setDriverInfo({
                                ...driverInfo,
                                vehicleModel: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicleYear">Year</Label>
                          <Input
                            id="vehicleYear"
                            value={driverInfo.vehicleYear}
                            onChange={(e) =>
                              setDriverInfo({
                                ...driverInfo,
                                vehicleYear: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Working Hours */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Working Hours
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(driverInfo.workingHours).map(
                          ([day, hours]) => (
                            <div
                              key={day}
                              className="flex items-center justify-between p-3 border rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <Switch
                                  checked={hours.working}
                                  onCheckedChange={(checked) =>
                                    setDriverInfo({
                                      ...driverInfo,
                                      workingHours: {
                                        ...driverInfo.workingHours,
                                        [day]: { ...hours, working: checked },
                                      },
                                    })
                                  }
                                />
                                <span className="font-medium capitalize min-w-[80px]">
                                  {day}
                                </span>
                              </div>
                              {hours.working && (
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="time"
                                    value={hours.start}
                                    onChange={(e) =>
                                      setDriverInfo({
                                        ...driverInfo,
                                        workingHours: {
                                          ...driverInfo.workingHours,
                                          [day]: {
                                            ...hours,
                                            start: e.target.value,
                                          },
                                        },
                                      })
                                    }
                                    className="w-24"
                                  />
                                  <span>to</span>
                                  <Input
                                    type="time"
                                    value={hours.end}
                                    onChange={(e) =>
                                      setDriverInfo({
                                        ...driverInfo,
                                        workingHours: {
                                          ...driverInfo.workingHours,
                                          [day]: {
                                            ...hours,
                                            end: e.target.value,
                                          },
                                        },
                                      })
                                    }
                                    className="w-24"
                                  />
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Earnings Summary */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Earnings Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            £{driverStats.weeklyEarnings}
                          </div>
                          <div className="text-sm text-green-700">
                            This Week
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            £{driverStats.monthlyEarnings}
                          </div>
                          <div className="text-sm text-blue-700">
                            This Month
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">
                            {driverStats.onTimeRate}%
                          </div>
                          <div className="text-sm text-purple-700">
                            On-Time Rate
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">
                            £{driverStats.avgHourlyRate}
                          </div>
                          <div className="text-sm text-orange-700">
                            Avg/Hour
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                        onClick={() =>
                          showDriverNotification(
                            "success",
                            "Driver Settings Updated",
                            "Your driver information has been saved successfully.",
                          )
                        }
                      >
                        Save Driver Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Saved Addresses */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Saved Addresses
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {address.label}
                            </p>
                            {address.isDefault && (
                              <Badge variant="outline">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods / Banking */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      {userType === "driver"
                        ? "Banking Details"
                        : "Payment Methods"}
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      {userType === "driver" ? "Add Account" : "Add Card"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                          {userType === "driver"
                            ? "🏦"
                            : method.type.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {userType === "driver"
                                ? `${method.bankName} ${method.accountNumber}`
                                : `•••• •••• •••• ${method.last4}`}
                            </p>
                            {method.isDefault && (
                              <Badge variant="outline">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {userType === "driver"
                              ? `Sort Code: ${method.sortCode}`
                              : `Expires ${method.expiry}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  {userType === "driver" && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          Payout Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Payout Frequency</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Minimum Payout</Label>
                            <Select defaultValue="50">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="25">£25</SelectItem>
                                <SelectItem value="50">£50</SelectItem>
                                <SelectItem value="100">£100</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      {userType === "driver"
                        ? "Driver Notifications"
                        : "Delivery Notifications"}
                    </h3>
                    <div className="space-y-3">
                      {(userType === "driver"
                        ? [
                            {
                              key: "newDeliveryRequests",
                              label: "New Delivery Requests",
                              description:
                                "Get notified when new delivery requests are available",
                            },
                            {
                              key: "earningsUpdates",
                              label: "Earnings Updates",
                              description:
                                "Notifications about payments and earnings",
                            },
                            {
                              key: "scheduleChanges",
                              label: "Schedule Changes",
                              description:
                                "Updates about delivery schedule modifications",
                            },
                            {
                              key: "systemAnnouncements",
                              label: "System Announcements",
                              description:
                                "Important platform updates and announcements",
                            },
                            {
                              key: "trainingReminders",
                              label: "Training Reminders",
                              description:
                                "Reminders for certification renewals",
                            },
                            {
                              key: "weatherAlerts",
                              label: "Weather Alerts",
                              description:
                                "Safety alerts for adverse weather conditions",
                            },
                          ]
                        : [
                            {
                              key: "orderUpdates",
                              label: "Order Updates",
                              description:
                                "Get notified about order status changes",
                            },
                            {
                              key: "driverUpdates",
                              label: "Driver Updates",
                              description:
                                "Notifications when driver is assigned or arrives",
                            },
                            {
                              key: "promotions",
                              label: "Promotions & Offers",
                              description:
                                "Special offers and discount notifications",
                            },
                          ]
                      ).map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                item.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) => {
                              setNotifications({
                                ...notifications,
                                [item.key]: checked,
                              });
                              if (userType === "driver" && checked) {
                                showDriverNotification(
                                  "info",
                                  "Notification Enabled",
                                  `You will now receive ${item.label.toLowerCase()}`,
                                );
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Notification Channels
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                          description: "Receive notifications via email",
                        },
                        {
                          key: "smsNotifications",
                          label: "SMS Notifications",
                          description: "Receive notifications via text message",
                        },
                        {
                          key: "pushNotifications",
                          label: "Push Notifications",
                          description: "Receive browser push notifications",
                        },
                        ...(userType === "driver"
                          ? [
                              {
                                key: "inAppNotifications",
                                label: "In-App Notifications",
                                description:
                                  "Show notifications within the driver app",
                              },
                            ]
                          : []),
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                item.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                [item.key]: checked,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                      onClick={() => {
                        if (userType === "driver") {
                          showDriverNotification(
                            "success",
                            "Preferences Saved",
                            "Your notification preferences have been updated.",
                          );
                        } else {
                          showSuccessNotification(
                            "Preferences Saved",
                            "Your notification preferences have been updated.",
                          );
                        }
                      }}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {(userType === "driver"
                      ? [
                          {
                            key: "shareLocation",
                            label: "Share Location Data",
                            description:
                              "Required for delivery tracking and customer updates",
                            required: true,
                          },
                          {
                            key: "shareEarnings",
                            label: "Share Earnings Data",
                            description:
                              "Allow earnings data to be used for platform analytics",
                          },
                          {
                            key: "shareRatings",
                            label: "Share Ratings & Reviews",
                            description:
                              "Allow customers to see your ratings and reviews",
                          },
                          {
                            key: "profileVisibility",
                            label: "Profile Visibility",
                            description:
                              "Allow customers to see your profile information",
                          },
                          {
                            key: "allowMarketing",
                            label: "Marketing Communications",
                            description:
                              "Receive promotional emails and special offers",
                          },
                          {
                            key: "dataSharing",
                            label: "Data Sharing with Partners",
                            description:
                              "Allow sharing of anonymized usage data with partners",
                          },
                        ]
                      : [
                          {
                            key: "shareLocation",
                            label: "Share Location Data",
                            description:
                              "Allow us to use your location for better delivery tracking",
                          },
                          {
                            key: "allowMarketing",
                            label: "Marketing Communications",
                            description:
                              "Receive promotional emails and special offers",
                          },
                          {
                            key: "dataSharing",
                            label: "Data Sharing with Partners",
                            description:
                              "Allow sharing of anonymized usage data with partners",
                          },
                        ]
                    ).map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {item.label}
                            </p>
                            {item.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <Switch
                          checked={privacy[item.key as keyof typeof privacy]}
                          disabled={item.required}
                          onCheckedChange={(checked) =>
                            setPrivacy({
                              ...privacy,
                              [item.key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Data & Privacy
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Terms of Service
                      </Button>
                      {userType === "driver" && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Car className="w-4 h-4 mr-2" />
                          Driver Agreement
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                      onClick={() => {
                        if (userType === "driver") {
                          showDriverNotification(
                            "success",
                            "Privacy Settings Updated",
                            "Your privacy preferences have been saved.",
                          );
                        } else {
                          showSuccessNotification(
                            "Privacy Settings Updated",
                            "Your privacy preferences have been saved.",
                          );
                        }
                      }}
                    >
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSettings;

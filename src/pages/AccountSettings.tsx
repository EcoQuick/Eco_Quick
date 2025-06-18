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
} from "lucide-react";
import { useState } from "react";

const AccountSettings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (415) 555-0123",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    driverUpdates: true,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    allowMarketing: false,
    dataSharing: false,
  });

  const savedAddresses = [
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
  ];

  const paymentMethods = [
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
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
                  </div>

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
                    <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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

            {/* Payment Methods */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Methods
                    </CardTitle>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Card
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
                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                          {method.type.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              •••• •••• •••• {method.last4}
                            </p>
                            {method.isDefault && (
                              <Badge variant="outline">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiry}
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
                      Delivery Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
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
                    <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
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
                    {[
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
                          checked={privacy[item.key as keyof typeof privacy]}
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
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Privacy Policy
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Terms of Service
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
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

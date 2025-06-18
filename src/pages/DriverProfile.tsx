import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Car,
  FileText,
  Camera,
  Star,
  CheckCircle,
  AlertCircle,
  Upload,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DriverProfile = () => {
  const [profileData, setProfileData] = useState({
    // Personal Info
    firstName: "Mike",
    lastName: "Rodriguez",
    email: "mike.rodriguez@email.com",
    phone: "+1 (415) 555-0198",
    address: "789 Castro St, San Francisco, CA 94114",
    dateOfBirth: "1985-03-15",

    // Vehicle Info
    vehicleType: "car",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleYear: "2020",
    vehicleColor: "Silver",
    licensePlate: "ABC1234",

    // Documents
    driversLicense: "uploaded",
    insurance: "uploaded",
    registration: "uploaded",
    backgroundCheck: "approved",

    // Settings
    isAvailable: true,
    maxDeliveryDistance: "15",
    acceptCashOrders: false,
    notificationsEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "uploaded":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Pending Review
          </Badge>
        );
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Uploaded</Badge>;
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, would save to backend
    console.log("Saving profile data:", profileData);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Driver Profile
                </h1>
                <p className="text-gray-600">
                  Manage your profile and vehicle information
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/driver-dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
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
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src="/api/placeholder/80/80"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {isEditing && (
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white hover:bg-brand-violet/90">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Profile Photo
                      </h3>
                      <p className="text-sm text-gray-600">
                        This will be visible to customers
                      </p>
                      {isEditing && (
                        <Button size="sm" variant="outline" className="mt-2">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload New Photo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          disabled={!isEditing}
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
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Driver Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-violet">
                        4.8
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-violet">
                        127
                      </div>
                      <div className="text-sm text-gray-600">Deliveries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-violet">
                        98%
                      </div>
                      <div className="text-sm text-gray-600">On-time Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vehicle Information */}
            <TabsContent value="vehicle">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="w-5 h-5 mr-2" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select
                        value={profileData.vehicleType}
                        onValueChange={(value) =>
                          setProfileData({ ...profileData, vehicleType: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle</SelectItem>
                          <SelectItem value="bicycle">Bicycle</SelectItem>
                          <SelectItem value="scooter">Scooter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input
                        id="licensePlate"
                        value={profileData.licensePlate}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            licensePlate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleMake">Make</Label>
                      <Input
                        id="vehicleMake"
                        value={profileData.vehicleMake}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            vehicleMake: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">Model</Label>
                      <Input
                        id="vehicleModel"
                        value={profileData.vehicleModel}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            vehicleModel: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleYear">Year</Label>
                      <Input
                        id="vehicleYear"
                        value={profileData.vehicleYear}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            vehicleYear: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleColor">Color</Label>
                      <Input
                        id="vehicleColor"
                        value={profileData.vehicleColor}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            vehicleColor: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Vehicle Photo */}
                  <div className="space-y-4">
                    <Label>Vehicle Photos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="relative">
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                          {isEditing && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute inset-0 m-auto w-fit h-fit"
                            >
                              Upload
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      key: "driversLicense",
                      name: "Driver's License",
                      required: true,
                    },
                    {
                      key: "insurance",
                      name: "Vehicle Insurance",
                      required: true,
                    },
                    {
                      key: "registration",
                      name: "Vehicle Registration",
                      required: true,
                    },
                    {
                      key: "backgroundCheck",
                      name: "Background Check",
                      required: true,
                    },
                  ].map((doc) => (
                    <div
                      key={doc.key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {doc.name}
                            {doc.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600">
                            Required for driving
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getDocumentStatus(
                          profileData[
                            doc.key as keyof typeof profileData
                          ] as string,
                        )}
                        <Button size="sm" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Verification Status */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900">
                          Account Verification
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Your account is verified and approved for deliveries.
                          All required documents have been reviewed and approved
                          by our team.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="availability">
                          Available for Deliveries
                        </Label>
                        <p className="text-sm text-gray-600">
                          Turn on to receive delivery requests
                        </p>
                      </div>
                      <Switch
                        id="availability"
                        checked={profileData.isAvailable}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            isAvailable: checked,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxDistance">
                        Maximum Delivery Distance (miles)
                      </Label>
                      <Input
                        id="maxDistance"
                        type="number"
                        value={profileData.maxDeliveryDistance}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            maxDeliveryDistance: e.target.value,
                          })
                        }
                        placeholder="15"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cashOrders">Accept Cash Orders</Label>
                        <p className="text-sm text-gray-600">
                          Allow customers to pay with cash on delivery
                        </p>
                      </div>
                      <Switch
                        id="cashOrders"
                        checked={profileData.acceptCashOrders}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            acceptCashOrders: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-600">
                          Receive notifications for new delivery requests
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={profileData.notificationsEnabled}
                        onCheckedChange={(checked) =>
                          setProfileData({
                            ...profileData,
                            notificationsEnabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Deactivate Driver Account
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

export default DriverProfile;

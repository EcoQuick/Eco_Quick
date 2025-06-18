import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Truck,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Car,
  FileText,
  CheckCircle,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const DriverSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    insurance: "",
  });

  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    backgroundCheck: false,
    insurance: false,
  });

  const handlePersonalInfoSubmit = () => {
    // Validate personal info
    if (
      !personalInfo.firstName ||
      !personalInfo.lastName ||
      !personalInfo.email ||
      !personalInfo.phone ||
      !personalInfo.password
    ) {
      showErrorNotification(
        "Missing Information",
        "Please fill in all required fields.",
      );
      return;
    }

    if (personalInfo.password !== personalInfo.confirmPassword) {
      showErrorNotification("Password Mismatch", "Passwords do not match.");
      return;
    }

    setCurrentStep(2);
  };

  const handleVehicleInfoSubmit = () => {
    // Validate vehicle info
    if (
      !vehicleInfo.vehicleType ||
      !vehicleInfo.make ||
      !vehicleInfo.model ||
      !vehicleInfo.year ||
      !vehicleInfo.licensePlate
    ) {
      showErrorNotification(
        "Missing Information",
        "Please fill in all required vehicle details.",
      );
      return;
    }

    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    // Validate agreements
    if (
      !agreements.termsOfService ||
      !agreements.privacyPolicy ||
      !agreements.backgroundCheck ||
      !agreements.insurance
    ) {
      showErrorNotification(
        "Agreements Required",
        "Please accept all required agreements to continue.",
      );
      return;
    }

    setIsLoading(true);

    // Simulate driver signup process
    setTimeout(() => {
      setIsLoading(false);
      showSuccessNotification(
        "Application Submitted!",
        "We'll review your application and contact you within 24-48 hours.",
      );

      // Store demo driver data
      const driverData = {
        ...personalInfo,
        ...vehicleInfo,
        type: "driver",
        status: "pending_approval",
      };
      localStorage.setItem(
        "pendingDriverApplication",
        JSON.stringify(driverData),
      );

      navigate("/auth?message=driver-application-submitted");
    }, 2000);
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Become an EcoQuick Driver
        </CardTitle>
        <p className="text-gray-600">Step 1 of 3: Personal Information</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white text-sm font-bold">
            1
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            2
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            3
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    firstName: e.target.value,
                  })
                }
                className="pl-10"
                placeholder="Enter your first name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                }
                className="pl-10"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className="pl-10"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className="pl-10"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={personalInfo.password}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, password: e.target.value })
                }
                className="pl-10"
                placeholder="Create a secure password"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                value={personalInfo.confirmPassword}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    confirmPassword: e.target.value,
                  })
                }
                className="pl-10"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, address: e.target.value })
                }
                className="pl-10"
                placeholder="123 Main Street"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={personalInfo.city}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, city: e.target.value })
              }
              placeholder="San Francisco"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={personalInfo.state}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, state: e.target.value })
              }
              placeholder="CA"
              required
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" asChild>
            <Link to="/auth">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </Button>
          <Button
            onClick={handlePersonalInfoSubmit}
            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
          >
            Continue to Vehicle Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
          <Car className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Vehicle Information
        </CardTitle>
        <p className="text-gray-600">Step 2 of 3: Tell us about your vehicle</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="w-16 h-1 bg-brand-violet"></div>
          <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white text-sm font-bold">
            2
          </div>
          <div className="w-16 h-1 bg-gray-200"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
            3
          </div>
        </div>

        {/* Vehicle Information Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type *</Label>
            <Select
              value={vehicleInfo.vehicleType}
              onValueChange={(value) =>
                setVehicleInfo({ ...vehicleInfo, vehicleType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
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
            <Label htmlFor="licensePlate">License Plate *</Label>
            <Input
              id="licensePlate"
              value={vehicleInfo.licensePlate}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, licensePlate: e.target.value })
              }
              placeholder="ABC1234"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="make">Make *</Label>
            <Input
              id="make"
              value={vehicleInfo.make}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, make: e.target.value })
              }
              placeholder="Toyota"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              value={vehicleInfo.model}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, model: e.target.value })
              }
              placeholder="Camry"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="number"
              value={vehicleInfo.year}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, year: e.target.value })
              }
              placeholder="2020"
              min="2000"
              max="2024"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={vehicleInfo.color}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, color: e.target.value })
              }
              placeholder="Silver"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="insurance">Insurance Company</Label>
            <Input
              id="insurance"
              value={vehicleInfo.insurance}
              onChange={(e) =>
                setVehicleInfo({ ...vehicleInfo, insurance: e.target.value })
              }
              placeholder="State Farm"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleVehicleInfoSubmit}
            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
          >
            Continue to Agreements
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Final Steps
        </CardTitle>
        <p className="text-gray-600">
          Step 3 of 3: Review and accept agreements
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="w-16 h-1 bg-green-500"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="w-16 h-1 bg-brand-violet"></div>
          <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white text-sm font-bold">
            3
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Driver Requirements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                Must be 21 years or older
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                Valid driver's license
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Vehicle insurance</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">
                Clean driving record
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Agreements */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Required Agreements</h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreements.termsOfService}
                onCheckedChange={(checked) =>
                  setAgreements({ ...agreements, termsOfService: !!checked })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 leading-5"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-brand-violet hover:underline">
                  Terms of Service
                </Link>{" "}
                and understand the driver responsibilities and requirements.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={agreements.privacyPolicy}
                onCheckedChange={(checked) =>
                  setAgreements({ ...agreements, privacyPolicy: !!checked })
                }
              />
              <label
                htmlFor="privacy"
                className="text-sm text-gray-700 leading-5"
              >
                I agree to the{" "}
                <Link
                  to="/privacy"
                  className="text-brand-violet hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and consent to background checks and data processing.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="background"
                checked={agreements.backgroundCheck}
                onCheckedChange={(checked) =>
                  setAgreements({ ...agreements, backgroundCheck: !!checked })
                }
              />
              <label
                htmlFor="background"
                className="text-sm text-gray-700 leading-5"
              >
                I consent to a background check and understand it may take 2-3
                business days for approval.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="insurance-agreement"
                checked={agreements.insurance}
                onCheckedChange={(checked) =>
                  setAgreements({ ...agreements, insurance: !!checked })
                }
              />
              <label
                htmlFor="insurance-agreement"
                className="text-sm text-gray-700 leading-5"
              >
                I confirm that I have valid vehicle insurance and will maintain
                coverage while driving for EcoQuick.
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(2)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleFinalSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting Application...
              </div>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 py-12 px-4">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
    </Layout>
  );
};

export default DriverSignup;

import Layout from "@/components/layout/Layout";
import DriverCertification from "@/components/DriverCertification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  initiateBackgroundCheck,
  initiateGreenRiderCertification,
  validateGreenVehicle,
  type BackgroundCheckResult,
  type GreenRiderCertification,
  type DriverCertificationStatus,
} from "@/lib/backgroundCheck";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const DriverCertificationPage = () => {
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState<any>(null);
  const [backgroundCheck, setBackgroundCheck] =
    useState<BackgroundCheckResult | null>(null);
  const [greenRiderCert, setGreenRiderCert] =
    useState<GreenRiderCertification | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user has pending driver application
    const pendingApplication = localStorage.getItem("pendingDriverApplication");

    if (!pendingApplication) {
      showErrorNotification(
        "No Application Found",
        "Please complete the driver signup process first.",
      );
      navigate("/driver/signup");
      return;
    }

    const data = JSON.parse(pendingApplication);
    setDriverData(data);

    // Initialize certification processes
    initializeCertification(data);
  }, [navigate]);

  const initializeCertification = async (data: any) => {
    setIsInitializing(true);

    try {
      // Start background check
      const bgCheck = await initiateBackgroundCheck(data.email, data);
      setBackgroundCheck(bgCheck);

      // Initialize Green Rider certification
      const vehicleValidation = validateGreenVehicle(data);
      if (!vehicleValidation.isValid) {
        showErrorNotification(
          "Vehicle Requirements",
          vehicleValidation.message +
            " " +
            (vehicleValidation.recommendations?.[0] || ""),
        );
      }

      const greenCert = await initiateGreenRiderCertification(data.email, data);
      setGreenRiderCert(greenCert);

      showSuccessNotification(
        "Certification Started!",
        "Background check initiated and certification requirements are ready.",
      );
    } catch (error) {
      showErrorNotification(
        "Initialization Error",
        "Failed to start certification process. Please try again.",
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const handleStatusUpdate = (status: DriverCertificationStatus) => {
    if (status.readyToStart) {
      // Update localStorage to mark driver as ready
      const updatedData = {
        ...driverData,
        certificationComplete: true,
        status: "approved",
      };
      localStorage.setItem("approvedDriver", JSON.stringify(updatedData));
      localStorage.removeItem("pendingDriverApplication");
    }
  };

  if (isInitializing) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12">
              <CardContent>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-violet mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Initializing Certification Process
                </h3>
                <p className="text-gray-600">
                  Setting up your background check and certification
                  requirements...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!backgroundCheck || !greenRiderCert) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center py-12">
              <CardContent>
                <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Certification Setup Failed
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't initialize your certification process. Please try
                  again.
                </p>
                <div className="space-x-4">
                  <Button
                    onClick={() => initializeCertification(driverData)}
                    className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                  >
                    Retry Setup
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/driver/signup">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Signup
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Driver Certification
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete your background verification and Green Rider
              certification to start driving for EcoQuick. This process ensures
              the safety and quality of our delivery network.
            </p>
          </div>

          {/* Driver Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Application Submitted</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {driverData?.firstName} {driverData?.lastName}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {driverData?.email}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Vehicle:</span>{" "}
                  {driverData?.vehicleType} - {driverData?.make}{" "}
                  {driverData?.model}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {driverData?.city}, {driverData?.state}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certification Component */}
          <DriverCertification
            driverId={driverData?.email || "demo-driver"}
            backgroundCheck={backgroundCheck}
            greenRiderCert={greenRiderCert}
            onStatusUpdate={handleStatusUpdate}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" asChild>
              <Link to="/driver/signup">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Application
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                showSuccessNotification(
                  "Progress Saved",
                  "Your certification progress has been saved. You can continue anytime.",
                );
                navigate("/");
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Continue Later
            </Button>
          </div>

          {/* Help Section */}
          <Card className="mt-8 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-3">
                If you have questions about the certification process or
                encounter any issues:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Email us at support@ecoquick.com</li>
                <li>• Call our driver support line: 020 8974 5555</li>
                <li>• Visit our help center for detailed guides</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DriverCertificationPage;

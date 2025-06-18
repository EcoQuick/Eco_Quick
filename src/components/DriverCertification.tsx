import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  CheckCircle,
  Clock,
  X,
  Play,
  Book,
  Car,
  Leaf,
  FileText,
  AlertTriangle,
} from "lucide-react";
import {
  GREEN_RIDER_REQUIREMENTS,
  completeRequirement,
  getDriverCertificationStatus,
  getNextSteps,
  type GreenRiderCertification,
  type BackgroundCheckResult,
  type DriverCertificationStatus,
} from "@/lib/backgroundCheck";
import {
  showSuccessNotification,
  showErrorNotification,
} from "./NotificationSystem";

interface DriverCertificationProps {
  driverId: string;
  backgroundCheck: BackgroundCheckResult;
  greenRiderCert: GreenRiderCertification;
  onStatusUpdate?: (status: DriverCertificationStatus) => void;
}

const DriverCertification = ({
  driverId,
  backgroundCheck,
  greenRiderCert,
  onStatusUpdate,
}: DriverCertificationProps) => {
  const [currentCert, setCurrentCert] = useState(greenRiderCert);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [certificationStatus, setCertificationStatus] = useState(
    getDriverCertificationStatus(backgroundCheck, greenRiderCert),
  );

  useEffect(() => {
    const status = getDriverCertificationStatus(backgroundCheck, currentCert);
    setCertificationStatus(status);
    onStatusUpdate?.(status);
  }, [backgroundCheck, currentCert, onStatusUpdate]);

  const handleStartRequirement = async (
    requirement: keyof GreenRiderCertification["requirements"],
  ) => {
    setIsLoading(requirement);

    try {
      // Simulate training/test completion
      const result = await completeRequirement(currentCert.id, requirement);

      if (result.success) {
        showSuccessNotification("Requirement Completed!", result.message);

        // Update the certification status
        if (result.updatedCertification) {
          setCurrentCert((prev) => ({
            ...prev,
            requirements: {
              ...prev.requirements,
              [requirement]: true,
            },
            testScores: result.updatedCertification!.testScores,
          }));
        }
      } else {
        showErrorNotification("Requirement Failed", result.message);
      }
    } catch (error) {
      showErrorNotification(
        "Error",
        "Failed to complete requirement. Please try again.",
      );
    } finally {
      setIsLoading(null);
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement) {
      case "environmentalTraining":
        return <Book className="w-5 h-5" />;
      case "safetyTraining":
        return <Shield className="w-5 h-5" />;
      case "vehicleInspection":
        return <Car className="w-5 h-5" />;
      case "greenTransportCommitment":
        return <Leaf className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">✅ Approved</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">❌ Rejected</Badge>;
      case "certified":
        return (
          <Badge className="bg-green-100 text-green-800">🏆 Certified</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const completedRequirements = Object.values(currentCert.requirements).filter(
    Boolean,
  ).length;
  const totalRequirements = Object.keys(currentCert.requirements).length;
  const progressPercentage = (completedRequirements / totalRequirements) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-brand-violet" />
              <span>Driver Certification Status</span>
            </CardTitle>
            {getStatusBadge(certificationStatus.overallStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>
                  {completedRequirements}/{totalRequirements} Complete
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Next Steps:</h4>
              <ul className="space-y-1">
                {getNextSteps(certificationStatus).map((step, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-violet rounded-full"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Check Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Background Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Criminal Background Check
              </p>
              <p className="text-sm text-gray-600">
                {backgroundCheck.status === "pending"
                  ? "Processing... Results typically available in 2-3 business days"
                  : backgroundCheck.notes || "Background check completed"}
              </p>
            </div>
            {getStatusBadge(backgroundCheck.status)}
          </div>

          {backgroundCheck.results && backgroundCheck.status === "approved" && (
            <div className="mt-4 p-3 bg-green-50 rounded border">
              <h5 className="font-medium text-green-900 mb-2">
                Verification Results
              </h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Clean Criminal Record</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Valid License</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Insurance Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Identity Confirmed</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Green Rider Certification Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span>Green Rider Certification</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(GREEN_RIDER_REQUIREMENTS).map(
              ([key, requirement]) => {
                const isCompleted =
                  currentCert.requirements[
                    key as keyof typeof currentCert.requirements
                  ];
                const isCurrentlyLoading = isLoading === key;

                return (
                  <div
                    key={key}
                    className={`p-4 border rounded-lg ${
                      isCompleted
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isCompleted ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {getRequirementIcon(key)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {requirement.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {requirement.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>⏱️ Duration: {requirement.duration}</span>
                            <span>
                              📊 Passing Score: {requirement.passingScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {isCompleted ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        ) : (
                          <Button
                            onClick={() =>
                              handleStartRequirement(
                                key as keyof typeof currentCert.requirements,
                              )
                            }
                            disabled={
                              isCurrentlyLoading ||
                              backgroundCheck.status !== "approved"
                            }
                            size="sm"
                            className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                          >
                            {isCurrentlyLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {currentCert.testScores &&
                      key === "environmentalTraining" &&
                      currentCert.testScores.environmentalKnowledge > 0 && (
                        <div className="mt-3 text-sm text-green-700">
                          Score: {currentCert.testScores.environmentalKnowledge}
                          %
                        </div>
                      )}
                    {currentCert.testScores &&
                      key === "safetyTraining" &&
                      currentCert.testScores.safetyProtocols > 0 && (
                        <div className="mt-3 text-sm text-green-700">
                          Score: {currentCert.testScores.safetyProtocols}%
                        </div>
                      )}
                  </div>
                );
              },
            )}
          </div>

          {backgroundCheck.status !== "approved" && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Green Rider Certification requires background check approval.
                Please wait for verification to complete.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Certification Complete */}
      {certificationStatus.readyToStart && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            🎉 Congratulations! You've completed all certification requirements
            and are ready to start driving for EcoQuick. Your account will be
            activated within 24 hours.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DriverCertification;

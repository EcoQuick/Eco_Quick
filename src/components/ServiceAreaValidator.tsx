import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, CheckCircle, X, Info } from "lucide-react";
import {
  validateServiceArea,
  geocodeUKAddress,
  getServiceAreaDescription,
  type LocationValidationResult,
} from "@/lib/geographicService";

interface ServiceAreaValidatorProps {
  address: string;
  onValidationChange?: (result: LocationValidationResult) => void;
  showDescription?: boolean;
  className?: string;
}

const ServiceAreaValidator = ({
  address,
  onValidationChange,
  showDescription = true,
  className = "",
}: ServiceAreaValidatorProps) => {
  const [validationResult, setValidationResult] =
    useState<LocationValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (!address || address.length < 5) {
      setValidationResult(null);
      onValidationChange?.(null as any);
      return;
    }

    const validateAddress = async () => {
      setIsValidating(true);

      try {
        // First try to validate with postcode only
        let result = validateServiceArea(address);

        // If validation is uncertain, try to geocode
        if (!result.isValid && !result.distance) {
          const coordinates = await geocodeUKAddress(address);
          if (coordinates) {
            result = validateServiceArea(address, coordinates);
          }
        }

        setValidationResult(result);
        onValidationChange?.(result);
      } catch (error) {
        console.error("Validation error:", error);
        const errorResult: LocationValidationResult = {
          isValid: false,
          message:
            "Unable to validate address. Please check the format and try again.",
        };
        setValidationResult(errorResult);
        onValidationChange?.(errorResult);
      } finally {
        setIsValidating(false);
      }
    };

    // Debounce validation
    const timeoutId = setTimeout(validateAddress, 500);
    return () => clearTimeout(timeoutId);
  }, [address, onValidationChange]);

  if (!address || address.length < 5) {
    return showDescription ? (
      <Card className={`border-blue-200 bg-blue-50 ${className}`}>
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Service Area</h4>
              <p className="text-sm text-blue-700">
                {getServiceAreaDescription()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ) : null;
  }

  if (isValidating) {
    return (
      <Card className={`border-gray-200 ${className}`}>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">
              Validating service area...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!validationResult) {
    return null;
  }

  const getAlertVariant = () => {
    if (validationResult.isValid) return "default";
    return "destructive";
  };

  const getIcon = () => {
    if (validationResult.isValid) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    return <X className="w-5 h-5 text-red-600" />;
  };

  const getTitle = () => {
    if (validationResult.isValid) {
      return "✅ Service Available";
    }
    return "❌ Outside Service Area";
  };

  return (
    <Alert variant={getAlertVariant()} className={className}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-medium mb-1">{getTitle()}</h4>
          <AlertDescription className="text-sm">
            {validationResult.message}
            {validationResult.distance && (
              <span className="block mt-1 text-xs opacity-75">
                Distance from service center:{" "}
                {validationResult.distance.toFixed(1)} miles
              </span>
            )}
          </AlertDescription>

          {!validationResult.isValid &&
            validationResult.nearestServicePoint && (
              <div className="mt-3 p-3 bg-blue-50 rounded border">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Nearest Service Area
                    </p>
                    <p className="text-xs text-blue-700">
                      {validationResult.nearestServicePoint}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      We're working to expand our service area. Check back soon!
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </Alert>
  );
};

export default ServiceAreaValidator;

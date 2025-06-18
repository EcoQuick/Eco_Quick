import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddressAutocomplete from "./AddressAutocomplete";
import ServiceAreaValidator from "./ServiceAreaValidator";
import MapComponent from "./MapComponent";
import {
  MapPin,
  Package,
  Clock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  validateServiceArea,
  type LocationValidationResult,
} from "@/lib/geographicService";
import {
  showSuccessNotification,
  showErrorNotification,
} from "./NotificationSystem";

const QuoteCalculator = () => {
  const navigate = useNavigate();
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [weight, setWeight] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [mapLocations, setMapLocations] = useState<any[]>([]);
  const [pickupValidation, setPickupValidation] =
    useState<LocationValidationResult | null>(null);
  const [deliveryValidation, setDeliveryValidation] =
    useState<LocationValidationResult | null>(null);

  const calculatePrice = () => {
    // Check service area validation first
    if (!pickupValidation?.isValid || !deliveryValidation?.isValid) {
      showErrorNotification(
        "Service Area Error",
        "Both pickup and delivery addresses must be within our service area.",
      );
      return;
    }

    // Simple price calculation logic
    if (!packageSize || !weight) return;

    // Update map locations when calculating price
    updateMapLocations();

    let basePrice = 6; // Base delivery fee for Kingston area

    // Add price based on package size
    switch (packageSize) {
      case "small":
        basePrice += 4;
        break;
      case "medium":
        basePrice += 9;
        break;
      case "large":
        basePrice += 16;
        break;
    }

    // Add price based on weight
    const weightNum = parseFloat(weight);
    if (weightNum > 2) {
      basePrice += (weightNum - 2) * 1.5; // £1.50 per additional kg over 2kg
    }

    // Distance-based pricing within service area
    const avgDistance = 3; // Average 3 miles within Kingston area
    basePrice += avgDistance * 0.8; // £0.80 per mile

    // Convert to pounds
    setEstimatedPrice(Math.round(basePrice * 100) / 100);
  };

  const handleGetQuote = () => {
    calculatePrice();
  };

  const canCalculate =
    pickupAddress &&
    deliveryAddress &&
    packageSize &&
    weight &&
    pickupValidation?.isValid &&
    deliveryValidation?.isValid;

  // Mock geocoding function - in production would use Google Maps Geocoding API
  const mockGeocode = (address: string, type: "pickup" | "delivery") => {
    // Mock coordinates for different areas
    const mockCoordinates = {
      pickup: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      delivery: { lat: 37.7849, lng: -122.4094 }, // Slightly different location
    };

    return {
      lat: mockCoordinates[type].lat + (Math.random() - 0.5) * 0.02,
      lng: mockCoordinates[type].lng + (Math.random() - 0.5) * 0.02,
      label: address.slice(0, 30) + (address.length > 30 ? "..." : ""),
      type: type,
    };
  };

  // Update map locations when addresses change
  const updateMapLocations = () => {
    const locations = [];
    if (pickupAddress) {
      locations.push(mockGeocode(pickupAddress, "pickup"));
    }
    if (deliveryAddress) {
      locations.push(mockGeocode(deliveryAddress, "delivery"));
    }
    setMapLocations(locations);
  };
  const handleBookNow = () => {
    if (!estimatedPrice) {
      showErrorNotification(
        "Get Quote First",
        "Please calculate your quote before booking.",
      );
      return;
    }

    // Check if user is logged in
    const demoUser = localStorage.getItem("demoUser");
    if (!demoUser) {
      showErrorNotification(
        "Login Required",
        "Please sign in to book a delivery.",
      );
      navigate("/auth");
      return;
    }

    // Navigate to checkout with parameters
    const checkoutUrl = `/checkout?pickup=${encodeURIComponent(pickupAddress)}&delivery=${encodeURIComponent(deliveryAddress)}&size=${packageSize}&weight=${weight}&price=${estimatedPrice}`;
    navigate(checkoutUrl);
    showSuccessNotification(
      "Redirecting to Checkout",
      "Complete your booking details...",
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Get Your Instant Quote
        </CardTitle>
        <p className="text-gray-600">Fast, reliable delivery in your city</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pickup Address */}
        <div className="space-y-2">
          <Label htmlFor="pickup" className="text-sm font-medium text-gray-700">
            Pickup Address
          </Label>
          <AddressAutocomplete
            value={pickupAddress}
            onChange={setPickupAddress}
            placeholder="Enter UK pickup address"
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
            className="h-12"
            validateServiceArea={true}
          />
          <ServiceAreaValidator
            address={pickupAddress}
            onValidationChange={setPickupValidation}
            showDescription={false}
            className="mt-2"
          />
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <Label
            htmlFor="delivery"
            className="text-sm font-medium text-gray-700"
          >
            Delivery Address
          </Label>
          <AddressAutocomplete
            value={deliveryAddress}
            onChange={setDeliveryAddress}
            placeholder="Enter UK delivery address"
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
            className="h-12"
            validateServiceArea={true}
          />
          <ServiceAreaValidator
            address={deliveryAddress}
            onValidationChange={setDeliveryValidation}
            showDescription={false}
            className="mt-2"
          />
        </div>

        {/* Route Map */}
        {mapLocations.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Delivery Route
            </Label>
            <MapComponent
              locations={mapLocations}
              showRoute={mapLocations.length === 2}
              className="h-64"
            />
          </div>
        )}

        {/* Package Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="package-size"
              className="text-sm font-medium text-gray-700"
            >
              Package Size
            </Label>
            <Select value={packageSize} onValueChange={setPackageSize}>
              <SelectTrigger className="h-12">
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Select size" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">
                  Small (up to 12" x 12" x 6")
                </SelectItem>
                <SelectItem value="medium">
                  Medium (up to 18" x 18" x 12")
                </SelectItem>
                <SelectItem value="large">
                  Large (up to 24" x 24" x 18")
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="weight"
              className="text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-12"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Get Quote Button */}
        <Button
          onClick={handleGetQuote}
          disabled={!canCalculate}
          className="w-full h-12 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white font-semibold"
        >
          Get Instant Quote
        </Button>

        {/* Service Area Info */}
        {!pickupAddress && !deliveryAddress && (
          <ServiceAreaValidator
            address=""
            showDescription={true}
            className="mt-4"
          />
        )}

        {/* Price Display */}
        {estimatedPrice && (
          <div className="bg-gradient-to-r from-brand-violet/10 to-brand-orange/10 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-sm text-gray-600">Estimated Price</p>
                <p className="text-3xl font-bold text-brand-violet">
                  £{estimatedPrice}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Within Kingston upon Thames area
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>30-60 min delivery</span>
              </div>
            </div>
            <Button
              onClick={handleBookNow}
              className="mt-4 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
            >
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Service Area Warning */}
        {(!pickupValidation?.isValid || !deliveryValidation?.isValid) &&
          (pickupAddress || deliveryAddress) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">
                  Service Area Limitation
                </h4>
                <p className="text-sm text-yellow-700">
                  Both addresses must be within our Kingston upon Thames service
                  area to proceed with booking.
                </p>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default QuoteCalculator;

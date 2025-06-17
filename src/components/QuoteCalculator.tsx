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
import { MapPin, Package, Clock, ArrowRight } from "lucide-react";

const QuoteCalculator = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [weight, setWeight] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    // Simple price calculation logic
    if (!packageSize || !weight) return;

    let basePrice = 5; // Base delivery fee

    // Add price based on package size
    switch (packageSize) {
      case "small":
        basePrice += 3;
        break;
      case "medium":
        basePrice += 8;
        break;
      case "large":
        basePrice += 15;
        break;
    }

    // Add price based on weight
    const weightNum = parseFloat(weight);
    if (weightNum > 5) {
      basePrice += (weightNum - 5) * 2; // $2 per additional pound over 5lbs
    }

    // Distance simulation (normally would use Mapbox API)
    const distanceMultiplier = 1.5; // Simulate average distance cost
    basePrice *= distanceMultiplier;

    setEstimatedPrice(Math.round(basePrice * 100) / 100);
  };

  const handleGetQuote = () => {
    calculatePrice();
  };

  const canCalculate =
    pickupAddress && deliveryAddress && packageSize && weight;

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
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="pickup"
              type="text"
              placeholder="Enter pickup address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <Label
            htmlFor="delivery"
            className="text-sm font-medium text-gray-700"
          >
            Delivery Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="delivery"
              type="text"
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

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
              Weight (lbs)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter weight"
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

        {/* Price Display */}
        {estimatedPrice && (
          <div className="bg-gradient-to-r from-brand-violet/10 to-brand-orange/10 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-sm text-gray-600">Estimated Price</p>
                <p className="text-3xl font-bold text-brand-violet">
                  ${estimatedPrice}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>30-60 min delivery</span>
              </div>
            </div>
            <Button
              className="mt-4 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
              asChild
            >
              <a href="/auth?quote=true">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteCalculator;

import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Clock,
  MapPin,
  Check,
  ArrowLeft,
  Calculator,
  Star,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Small Package",
      description: "Perfect for documents and small items",
      dimensions: 'Up to 12" × 12" × 6"',
      weight: "Up to 5 lbs",
      basePrice: 8.99,
      sizeeFee: 3.0,
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "SMS notifications",
        "Basic insurance ($100)",
      ],
      popular: false,
    },
    {
      name: "Medium Package",
      description: "Great for gifts and standard shipments",
      dimensions: 'Up to 18" × 18" × 12"',
      weight: "Up to 15 lbs",
      basePrice: 13.99,
      sizeFee: 8.0,
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "SMS & email notifications",
        "Enhanced insurance ($300)",
        "Priority matching",
      ],
      popular: true,
    },
    {
      name: "Large Package",
      description: "For bigger items and bulk shipments",
      dimensions: 'Up to 24" × 24" × 18"',
      weight: "Up to 50 lbs",
      basePrice: 20.99,
      sizeFee: 15.0,
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "SMS, email & push notifications",
        "Premium insurance ($500)",
        "Priority matching",
        "White-glove handling",
      ],
      popular: false,
    },
  ];

  const additionalFees = [
    {
      name: "Base Delivery Fee",
      price: "$5.00",
      description: "Flat fee for all deliveries",
    },
    {
      name: "Distance Fee",
      price: "$1.50/mile",
      description: "Calculated from pickup to delivery",
    },
    {
      name: "Weight Fee",
      price: "$2.00/lb",
      description: "For weight exceeding package tier limit",
    },
    {
      name: "Express Delivery",
      price: "+$10.00",
      description: "Guaranteed delivery within 30 minutes",
    },
    {
      name: "Scheduled Delivery",
      price: "$3.00",
      description: "Schedule delivery for specific time",
    },
  ];

  const deliveryZones = [
    {
      zone: "Zone 1",
      areas: "San Francisco Central",
      multiplier: "1.0x",
      description: "Downtown, SOMA, Mission Bay",
    },
    {
      zone: "Zone 2",
      areas: "San Francisco Extended",
      multiplier: "1.2x",
      description: "Richmond, Sunset, Castro, Haight",
    },
    {
      zone: "Zone 3",
      areas: "East Bay",
      multiplier: "1.5x",
      description: "Oakland, Berkeley, Alameda",
    },
    {
      zone: "Zone 4",
      areas: "South Bay",
      multiplier: "1.8x",
      description: "San Jose, Palo Alto, Mountain View",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No hidden fees, no surprises. Pay only for what you need with
                our straightforward pricing structure.
              </p>
            </div>
          </div>

          {/* Pricing Calculator CTA */}
          <div className="bg-gradient-to-r from-brand-violet to-brand-orange rounded-2xl p-8 mb-12 text-center text-white">
            <Calculator className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Get Instant Quote</h2>
            <p className="mb-6 opacity-90">
              Use our calculator to get an exact price for your delivery
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-brand-violet hover:bg-gray-50"
              asChild
            >
              <Link to="/#quote-calculator">Calculate Your Price</Link>
            </Button>
          </div>

          {/* Package Tiers */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Package Size Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`relative ${
                    tier.popular
                      ? "border-brand-violet shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-brand-violet text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-gray-600">{tier.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-brand-violet">
                        ${tier.basePrice}
                      </span>
                      <span className="text-gray-600"> starting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Dimensions:</span>
                        <span className="font-medium">{tier.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{tier.weight}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size fee:</span>
                        <span className="font-medium">${tier.sizeFee}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={
                        tier.popular
                          ? "w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                          : "w-full"
                      }
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/#quote-calculator">Get Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Fees */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Additional Fees
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFees.map((fee, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {fee.name}
                      </h3>
                      <span className="font-bold text-brand-violet">
                        {fee.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{fee.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Delivery Zones
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryZones.map((zone, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {zone.zone}
                    </h3>
                    <p className="text-sm font-medium text-brand-violet mb-2">
                      {zone.multiplier} base rate
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {zone.areas}
                    </p>
                    <p className="text-xs text-gray-600">{zone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What's Included
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Most deliveries completed within 30-60 minutes of booking
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Real-time Tracking
                  </h3>
                  <p className="text-gray-600">
                    Track your driver's location and get live delivery updates
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Insured Deliveries
                  </h3>
                  <p className="text-gray-600">
                    All packages are insured up to $500 for your peace of mind
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pricing FAQ
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    How is the final price calculated?
                  </h3>
                  <p className="text-gray-700">
                    Final price = Base fee ($5) + Size fee + Distance fee ($1.50
                    per mile) + Weight fee (if over limit) + Any additional
                    services. You'll see the exact breakdown before confirming
                    your order.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Are there any hidden fees?
                  </h3>
                  <p className="text-gray-700">
                    No hidden fees! The price shown at checkout is what you pay.
                    All taxes, fees, and charges are included in the final
                    price.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer discounts for frequent users?
                  </h3>
                  <p className="text-gray-700">
                    Yes! We offer loyalty rewards for frequent customers. You'll
                    earn points with each delivery that can be redeemed for
                    discounts on future orders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 border-brand-violet/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Get an instant quote for your delivery and experience the
                fastest, most reliable delivery service in the Bay Area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                  asChild
                >
                  <Link to="/#quote-calculator">Get Instant Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Sales Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;

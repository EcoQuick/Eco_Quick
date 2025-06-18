import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Building2,
  Truck,
  BarChart3,
  Shield,
  Clock,
  Users,
  Package,
  MapPin,
  CheckCircle,
  Star,
  Zap,
  Globe,
  CreditCard,
  FileText,
  HeadphonesIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const BusinessSolutions = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    deliveryVolume: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business inquiry submitted:", formData);
    // Handle form submission
  };

  const businessTypes = [
    "E-commerce/Retail",
    "Healthcare/Medical",
    "Legal Services",
    "Financial Services",
    "Real Estate",
    "Food & Beverage",
    "Manufacturing",
    "Other",
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time dashboards with delivery metrics, cost analysis, and performance insights to optimize your operations.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description:
        "Enterprise-grade security with package insurance up to $10,000, secure chain of custody, and compliance certifications.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description:
        "24/7 dedicated account management with priority support and custom SLA agreements for your business needs.",
    },
    {
      icon: Globe,
      title: "API Integration",
      description:
        "Seamless integration with your existing systems via REST API, webhooks, and white-label solutions.",
    },
    {
      icon: CreditCard,
      title: "Flexible Billing",
      description:
        "Monthly invoicing, volume discounts, and custom pricing models tailored to your delivery requirements.",
    },
    {
      icon: FileText,
      title: "Custom Workflows",
      description:
        "Configurable delivery rules, automated scheduling, and custom notification preferences for your team.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses",
      monthlyDeliveries: "Up to 100",
      price: "$8.99",
      priceNote: "per delivery",
      features: [
        "Same-day delivery",
        "Basic tracking",
        "Email support",
        "Standard insurance ($500)",
        "Online dashboard",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Great for growing companies",
      monthlyDeliveries: "100-1,000",
      price: "$7.99",
      priceNote: "per delivery",
      features: [
        "Priority delivery",
        "Advanced tracking & analytics",
        "Phone & email support",
        "Enhanced insurance ($2,500)",
        "API access",
        "Custom branding",
        "Volume discounts",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large-scale operations",
      monthlyDeliveries: "1,000+",
      price: "Custom",
      priceNote: "pricing",
      features: [
        "White-glove service",
        "Full API integration",
        "24/7 dedicated support",
        "Premium insurance ($10,000)",
        "Custom SLA",
        "Dedicated account manager",
        "Custom workflows",
        "Priority driver matching",
      ],
      popular: false,
    },
  ];

  const industries = [
    {
      icon: Building2,
      name: "E-commerce",
      description:
        "Fast fulfillment for online retailers with same-day and scheduled delivery options.",
      stats: "40% of our business customers",
    },
    {
      icon: Shield,
      name: "Healthcare",
      description:
        "Secure, temperature-controlled delivery for medical supplies, prescriptions, and lab samples.",
      stats: "99.9% on-time delivery rate",
    },
    {
      icon: FileText,
      name: "Legal Services",
      description:
        "Confidential document delivery with chain of custody tracking and signature confirmation.",
      stats: "100% secure delivery guarantee",
    },
    {
      icon: Package,
      name: "Manufacturing",
      description:
        "Just-in-time parts delivery to keep your production lines running smoothly.",
      stats: "Average 45-minute delivery",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button variant="outline" size="sm" asChild className="mb-6">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <Badge className="mb-4 bg-brand-violet/10 text-brand-violet border-brand-violet/20">
                Enterprise Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Delivery Solutions for
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  Your Business
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Scale your business with enterprise-grade delivery
                infrastructure. From startups to Fortune 500 companies, we power
                reliable, fast delivery at any scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                >
                  <a href="#contact">Get Started</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8"
                  asChild
                >
                  <Link to="/api-docs">View API Docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Features Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enterprise Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to power your business delivery operations
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Solutions */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industry Solutions
              </h2>
              <p className="text-xl text-gray-600">
                Specialized delivery solutions for different industries
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <industry.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {industry.description}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-brand-violet border-brand-violet/30"
                        >
                          {industry.stats}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Business Plans
              </h2>
              <p className="text-xl text-gray-600">
                Choose the plan that fits your delivery volume and requirements
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "border-brand-violet shadow-lg" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-brand-violet text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <p className="text-gray-600">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-brand-violet">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.priceNote}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {plan.monthlyDeliveries} deliveries/month
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.name === "Enterprise"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact" className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-600 mb-8">
                  Let's discuss how EcoQuick can help scale your business with
                  reliable, fast delivery solutions. Our team will work with you
                  to create a custom plan that fits your specific needs.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <HeadphonesIcon className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        24/7 Support
                      </h3>
                      <p className="text-gray-600">
                        Dedicated account management
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Quick Setup
                      </h3>
                      <p className="text-gray-600">Get started in 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Proven Results
                      </h3>
                      <p className="text-gray-600">
                        99.5% delivery success rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Our Business Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name *
                        </label>
                        <Input
                          required
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name *
                        </label>
                        <Input
                          required
                          value={formData.contactName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contactName: e.target.value,
                            })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Delivery Volume
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-violet"
                          value={formData.deliveryVolume}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              deliveryVolume: e.target.value,
                            })
                          }
                        >
                          <option value="">Select volume</option>
                          <option value="1-50">1-50 deliveries</option>
                          <option value="51-200">51-200 deliveries</option>
                          <option value="201-1000">201-1,000 deliveries</option>
                          <option value="1000+">1,000+ deliveries</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Business Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-violet"
                          value={formData.businessType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              businessType: e.target.value,
                            })
                          }
                        >
                          <option value="">Select type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your delivery needs..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                    >
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessSolutions;

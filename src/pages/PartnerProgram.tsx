import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Handshake,
  TrendingUp,
  Users,
  Globe,
  Code,
  Building2,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Package,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PartnerProgram = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    website: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership application submitted:", formData);
    // Handle form submission
  };

  const partnershipTypes = [
    {
      icon: Code,
      title: "Technology Partners",
      description:
        "Integrate with our API to offer delivery services to your customers. Perfect for e-commerce platforms, marketplaces, and SaaS companies.",
      benefits: [
        "Revenue share up to 15%",
        "Priority API support",
        "Co-marketing opportunities",
        "Technical documentation",
        "Dedicated partner manager",
      ],
      requirements: [
        "Active customer base",
        "Technical integration capability",
        "Minimum 100 deliveries/month",
      ],
    },
    {
      icon: Building2,
      title: "Enterprise Resellers",
      description:
        "Become an authorized reseller of EcoQuick services for enterprise clients. Ideal for logistics consultants and business service providers.",
      benefits: [
        "Commission up to 20%",
        "Sales training and materials",
        "Lead generation support",
        "Exclusive territory rights",
        "Marketing development funds",
      ],
      requirements: [
        "Proven B2B sales experience",
        "Existing enterprise relationships",
        "Minimum revenue commitment",
      ],
    },
    {
      icon: Globe,
      title: "Geographic Partners",
      description:
        "Expand our service to new markets as an exclusive geographic partner. Launch EcoQuick in your city or region.",
      benefits: [
        "Exclusive market rights",
        "Brand licensing agreement",
        "Operations training",
        "Marketing support",
        "Revenue sharing model",
      ],
      requirements: [
        "Local market knowledge",
        "Operations experience",
        "Investment capability",
      ],
    },
    {
      icon: Package,
      title: "Logistics Partners",
      description:
        "Partner with us to provide specialized delivery services like warehousing, cross-docking, or last-mile fulfillment.",
      benefits: [
        "Volume guarantees",
        "Preferred vendor status",
        "Joint service offerings",
        "Operational efficiency gains",
        "Long-term contracts",
      ],
      requirements: [
        "Logistics infrastructure",
        "Quality certifications",
        "Geographic coverage",
      ],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Revenue Growth",
      description:
        "Generate new revenue streams through commissions, revenue sharing, or service fees.",
    },
    {
      icon: Users,
      title: "Customer Value",
      description:
        "Offer your customers fast, reliable delivery services without building infrastructure.",
    },
    {
      icon: Zap,
      title: "Quick Integration",
      description:
        "Get started quickly with our comprehensive APIs, documentation, and support.",
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description:
        "Partner with a proven delivery platform trusted by thousands of businesses.",
    },
  ];

  const successStories = [
    {
      company: "ShopFlow E-commerce",
      type: "Technology Partner",
      results: "300% increase in customer retention",
      quote:
        "Integrating EcoQuick's same-day delivery transformed our customer experience. We've seen a dramatic increase in order frequency and customer satisfaction.",
      logo: "/api/placeholder/120/60",
    },
    {
      company: "Metro Logistics Solutions",
      type: "Enterprise Reseller",
      results: "$2M in new revenue",
      quote:
        "Our partnership with EcoQuick has opened new opportunities with enterprise clients who need reliable delivery solutions.",
      logo: "/api/placeholder/120/60",
    },
    {
      company: "Austin Delivery Co.",
      type: "Geographic Partner",
      results: "Market leader in 6 months",
      quote:
        "With EcoQuick's proven platform and our local expertise, we became the fastest-growing delivery service in Austin.",
      logo: "/api/placeholder/120/60",
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
                Partner Program
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grow Your Business
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  with EcoQuick
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Join our partner ecosystem and unlock new opportunities for
                growth. Whether you're integrating our API, reselling our
                services, or expanding to new markets, we'll support your
                success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                >
                  <a href="#apply">Become a Partner</a>
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
          {/* Benefits Overview */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Partner with EcoQuick?
              </h2>
              <p className="text-xl text-gray-600">
                Join the growing ecosystem of successful partners
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnership Types */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-xl text-gray-600">
                Choose the partnership model that fits your business
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {partnershipTypes.map((type, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {type.title}
                        </h3>
                        <p className="text-gray-600">{type.description}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Benefits:
                        </h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, benefitIndex) => (
                            <li
                              key={benefitIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Requirements:
                        </h4>
                        <ul className="space-y-2">
                          {type.requirements.map((requirement, reqIndex) => (
                            <li
                              key={reqIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-2 h-2 bg-brand-violet rounded-full mr-3 flex-shrink-0" />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partner Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how our partners are growing their businesses
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <img
                        src={story.logo}
                        alt={story.company}
                        className="h-12 mx-auto mb-4 opacity-60"
                      />
                      <Badge
                        variant="outline"
                        className="text-brand-violet border-brand-violet/30"
                      >
                        {story.type}
                      </Badge>
                    </div>
                    <blockquote className="text-gray-600 italic mb-4 text-center">
                      "{story.quote}"
                    </blockquote>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 mb-1">
                        {story.company}
                      </div>
                      <div className="text-sm text-brand-violet font-medium">
                        {story.results}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partner Network Stats
              </h2>
              <p className="text-xl text-gray-600">
                Join a thriving ecosystem of successful partners
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-violet mb-2">
                  500+
                </div>
                <div className="text-gray-600">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-violet mb-2">
                  $50M+
                </div>
                <div className="text-gray-600">Partner Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-violet mb-2">
                  95%
                </div>
                <div className="text-gray-600">Partner Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-violet mb-2">
                  25
                </div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div id="apply" className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ready to Partner with Us?
                </h2>
                <p className="text-gray-600 mb-8">
                  Tell us about your business and partnership goals. Our
                  partnership team will review your application and get back to
                  you within 48 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <Handshake className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Partnership Review
                      </h3>
                      <p className="text-gray-600">
                        48-hour application review process
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Onboarding Support
                      </h3>
                      <p className="text-gray-600">
                        Dedicated support throughout setup
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-violet/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Growth Opportunities
                      </h3>
                      <p className="text-gray-600">
                        Ongoing support for scaling your business
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Partnership Application</CardTitle>
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
                          Partnership Type *
                        </label>
                        <select
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-violet"
                          value={formData.partnershipType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              partnershipType: e.target.value,
                            })
                          }
                        >
                          <option value="">Select type</option>
                          <option value="technology">Technology Partner</option>
                          <option value="reseller">Enterprise Reseller</option>
                          <option value="geographic">Geographic Partner</option>
                          <option value="logistics">Logistics Partner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <Input
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              website: e.target.value,
                            })
                          }
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tell us about your business and partnership goals *
                      </label>
                      <Textarea
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe your business, target customers, and how you'd like to partner with EcoQuick..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                    >
                      Submit Application
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our partner terms
                      and privacy policy. We'll review your application and
                      respond within 48 hours.
                    </p>
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

export default PartnerProgram;

import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Shield,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Package,
  Camera,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const InsuranceClaims = () => {
  const [claimForm, setClaimForm] = useState({
    orderId: "",
    claimType: "",
    incidentDate: "",
    description: "",
    itemValue: "",
    contactMethod: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Claim submitted:", claimForm);
    // Handle form submission
  };

  const claimTypes = [
    {
      type: "lost",
      title: "Lost Package",
      description: "Package was not delivered and cannot be located",
      icon: Package,
      coverage: "Full item value up to coverage limit",
    },
    {
      type: "damaged",
      title: "Damaged Package",
      description: "Package arrived with visible damage or broken items",
      icon: AlertCircle,
      coverage: "Repair cost or replacement value",
    },
    {
      type: "stolen",
      title: "Stolen Package",
      description: "Package was delivered but subsequently stolen",
      icon: Shield,
      coverage: "Full item value with proof of delivery",
    },
    {
      type: "delay",
      title: "Delayed Delivery",
      description: "Package arrived significantly later than promised",
      icon: Clock,
      coverage: "Delivery fee refund or compensation",
    },
  ];

  const coverageTiers = [
    {
      name: "Basic Coverage",
      maxValue: 500,
      description: "Standard protection for most deliveries",
      fee: "Included",
      features: [
        "Lost package protection",
        "Damage coverage",
        "Theft protection (with proof)",
        "24-48 hour claim processing",
      ],
    },
    {
      name: "Enhanced Coverage",
      maxValue: 2500,
      description: "Higher protection for valuable items",
      fee: "$5.99",
      features: [
        "All basic coverage benefits",
        "Higher value protection",
        "Priority claim processing",
        "Direct replacement service",
        "No-fault coverage options",
      ],
    },
    {
      name: "Premium Coverage",
      maxValue: 10000,
      description: "Maximum protection for high-value items",
      fee: "$19.99",
      features: [
        "All enhanced coverage benefits",
        "Maximum value protection",
        "Same-day claim processing",
        "White-glove replacement",
        "Legal support included",
      ],
    },
  ];

  const claimProcess = [
    {
      step: 1,
      title: "File Your Claim",
      description:
        "Submit your claim form with incident details and supporting documentation",
      timeframe: "5 minutes",
    },
    {
      step: 2,
      title: "Initial Review",
      description:
        "Our claims team reviews your submission and may request additional information",
      timeframe: "2-4 hours",
    },
    {
      step: 3,
      title: "Investigation",
      description:
        "We investigate the incident, contact drivers, and review tracking data",
      timeframe: "1-3 business days",
    },
    {
      step: 4,
      title: "Resolution",
      description:
        "Claim is approved and compensation is processed or alternative solution provided",
      timeframe: "1-2 business days",
    },
  ];

  const faqItems = [
    {
      question: "How long do I have to file a claim?",
      answer:
        "Claims must be filed within 30 days of the delivery date or expected delivery date for lost packages.",
    },
    {
      question: "What documentation do I need?",
      answer:
        "You'll need photos of damage (if applicable), proof of item value (receipt/invoice), and the order confirmation from EcoQuick.",
    },
    {
      question: "How are claim values determined?",
      answer:
        "We use the original purchase price or fair market value, whichever is lower, up to your coverage limit.",
    },
    {
      question: "Can I track my claim status?",
      answer:
        "Yes, you'll receive email updates and can check your claim status in your customer dashboard.",
    },
    {
      question: "What if my claim is denied?",
      answer:
        "You can appeal the decision within 15 days by providing additional evidence or clarification.",
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
                Insurance Claims
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Package
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  Insurance Claims
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                File a claim for lost, damaged, or stolen packages. Our
                comprehensive insurance coverage protects your deliveries with
                fast, fair claim processing.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
              >
                <a href="#file-claim">File a Claim</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Claim Types */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Types of Claims
              </h2>
              <p className="text-xl text-gray-600">
                We cover various types of delivery incidents
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {claimTypes.map((claim, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                      <claim.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {claim.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {claim.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-brand-violet border-brand-violet/30"
                    >
                      {claim.coverage}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Coverage Tiers */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coverage Options
              </h2>
              <p className="text-xl text-gray-600">
                Choose the right level of protection for your packages
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {coverageTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`relative ${index === 1 ? "border-brand-violet shadow-lg" : ""}`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-brand-violet text-white">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {tier.name}
                    </CardTitle>
                    <p className="text-gray-600">{tier.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-brand-violet">
                        ${tier.maxValue.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-1">max coverage</span>
                    </div>
                    <p className="text-sm text-gray-500">Fee: {tier.fee}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, featureIndex) => (
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
                      className={`w-full ${index === 1 ? "bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white" : ""}`}
                      variant={index === 1 ? "default" : "outline"}
                    >
                      {index === 0 ? "Standard" : "Upgrade Coverage"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Claim Process */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Claim Process
              </h2>
              <p className="text-xl text-gray-600">
                Simple, transparent process from filing to resolution
              </p>
            </div>
            <div className="space-y-8">
              {claimProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <Badge
                      variant="outline"
                      className="text-brand-violet border-brand-violet/30"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {step.timeframe}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Claim Form */}
          <div id="file-claim" className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  File an Insurance Claim
                </CardTitle>
                <p className="text-center text-gray-600">
                  Provide details about your incident to start the claim process
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Claim Details</TabsTrigger>
                    <TabsTrigger value="documentation">
                      Documentation
                    </TabsTrigger>
                    <TabsTrigger value="review">Review & Submit</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6 mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Order ID *
                          </label>
                          <Input
                            required
                            value={claimForm.orderId}
                            onChange={(e) =>
                              setClaimForm({
                                ...claimForm,
                                orderId: e.target.value,
                              })
                            }
                            placeholder="ECO-123456789"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Claim Type *
                          </label>
                          <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-violet"
                            value={claimForm.claimType}
                            onChange={(e) =>
                              setClaimForm({
                                ...claimForm,
                                claimType: e.target.value,
                              })
                            }
                          >
                            <option value="">Select claim type</option>
                            <option value="lost">Lost Package</option>
                            <option value="damaged">Damaged Package</option>
                            <option value="stolen">Stolen Package</option>
                            <option value="delay">Delayed Delivery</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Incident Date *
                          </label>
                          <Input
                            type="date"
                            required
                            value={claimForm.incidentDate}
                            onChange={(e) =>
                              setClaimForm({
                                ...claimForm,
                                incidentDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Item Value *
                          </label>
                          <Input
                            type="number"
                            required
                            value={claimForm.itemValue}
                            onChange={(e) =>
                              setClaimForm({
                                ...claimForm,
                                itemValue: e.target.value,
                              })
                            }
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Incident Description *
                        </label>
                        <Textarea
                          required
                          value={claimForm.description}
                          onChange={(e) =>
                            setClaimForm({
                              ...claimForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Please provide detailed information about what happened..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Contact Method
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-violet"
                          value={claimForm.contactMethod}
                          onChange={(e) =>
                            setClaimForm({
                              ...claimForm,
                              contactMethod: e.target.value,
                            })
                          }
                        >
                          <option value="">Select contact method</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="documentation" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Upload Supporting Documents
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Please upload any relevant photos, receipts, or other
                        documentation to support your claim.
                      </p>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          Drag and drop files here, or click to select
                        </p>
                        <Button variant="outline">Choose Files</Button>
                        <p className="text-sm text-gray-500 mt-2">
                          Supported formats: JPG, PNG, PDF (max 10MB each)
                        </p>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Uploaded Files:
                          </h4>
                          <ul className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <span className="text-sm">{file}</span>
                                <Button variant="ghost" size="sm">
                                  Remove
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <Card className="p-4 text-center">
                          <Camera className="w-8 h-8 text-brand-violet mx-auto mb-2" />
                          <h4 className="font-medium text-gray-900 mb-1">
                            Damage Photos
                          </h4>
                          <p className="text-xs text-gray-600">
                            Clear photos of any damage
                          </p>
                        </Card>
                        <Card className="p-4 text-center">
                          <FileText className="w-8 h-8 text-brand-violet mx-auto mb-2" />
                          <h4 className="font-medium text-gray-900 mb-1">
                            Purchase Receipt
                          </h4>
                          <p className="text-xs text-gray-600">
                            Proof of item value
                          </p>
                        </Card>
                        <Card className="p-4 text-center">
                          <Package className="w-8 h-8 text-brand-violet mx-auto mb-2" />
                          <h4 className="font-medium text-gray-900 mb-1">
                            Packaging
                          </h4>
                          <p className="text-xs text-gray-600">
                            Original packaging photos
                          </p>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Review Your Claim
                      </h3>

                      <Card className="p-6 mb-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Claim Details
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>Order ID: {claimForm.orderId}</div>
                              <div>Type: {claimForm.claimType}</div>
                              <div>Date: {claimForm.incidentDate}</div>
                              <div>Value: ${claimForm.itemValue}</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              Next Steps
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div>• Initial review within 2-4 hours</div>
                              <div>• Email confirmation sent</div>
                              <div>• Updates via dashboard</div>
                              <div>• Resolution in 1-3 business days</div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900 mb-1">
                            Before Submitting
                          </p>
                          <p className="text-blue-700">
                            Please ensure all information is accurate and you've
                            uploaded all relevant documentation. Claims cannot
                            be edited after submission.
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12"
                        onClick={handleSubmit}
                      >
                        Submit Claim
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about insurance claims
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <HelpCircle className="w-5 h-5 text-brand-violet mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help with Your Claim?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our claims specialists are here to help you through the process.
              Contact us if you have questions or need assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Claims Support
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                <Link to="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsuranceClaims;

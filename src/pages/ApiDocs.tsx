import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Code,
  Key,
  BookOpen,
  Zap,
  Shield,
  Globe,
  Copy,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ApiDocs = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/deliveries",
      description: "Create a new delivery request",
      auth: true,
    },
    {
      method: "GET",
      endpoint: "/api/v1/deliveries/{id}",
      description: "Get delivery details by ID",
      auth: true,
    },
    {
      method: "GET",
      endpoint: "/api/v1/deliveries",
      description: "List all deliveries for your account",
      auth: true,
    },
    {
      method: "POST",
      endpoint: "/api/v1/deliveries/{id}/cancel",
      description: "Cancel a delivery",
      auth: true,
    },
    {
      method: "GET",
      endpoint: "/api/v1/quote",
      description: "Get delivery price quote",
      auth: false,
    },
    {
      method: "POST",
      endpoint: "/api/v1/webhooks",
      description: "Manage webhook endpoints",
      auth: true,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Tracking",
      description:
        "Get live updates on delivery status, driver location, and estimated arrival times.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "OAuth 2.0 and API key authentication with rate limiting and IP whitelisting.",
    },
    {
      icon: Globe,
      title: "Webhook Support",
      description:
        "Receive instant notifications about delivery status changes via webhooks.",
    },
    {
      icon: Code,
      title: "RESTful Design",
      description:
        "Clean, intuitive REST API with JSON responses and comprehensive error handling.",
    },
  ];

  const codeExamples = {
    createDelivery: `curl -X POST "https://api.ecoquick.com/v1/deliveries" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup": {
      "address": "123 Main St, San Francisco, CA 94105",
      "contact": {
        "name": "John Doe",
        "phone": "+1-555-123-4567"
      },
      "instructions": "Ring doorbell twice"
    },
    "delivery": {
      "address": "456 Oak Ave, San Francisco, CA 94102",
      "contact": {
        "name": "Jane Smith",
        "phone": "+1-555-987-6543"
      },
      "instructions": "Leave at front door"
    },
    "package": {
      "size": "medium",
      "weight": 2.5,
      "description": "Documents",
      "value": 100
    },
    "preferences": {
      "delivery_speed": "standard",
      "signature_required": false
    }
  }'`,

    trackDelivery: `curl -X GET "https://api.ecoquick.com/v1/deliveries/dlv_1234567890" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,

    webhook: `{
  "id": "evt_1234567890",
  "type": "delivery.status_updated",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "delivery_id": "dlv_1234567890",
    "status": "in_transit",
    "driver": {
      "name": "Mike Johnson",
      "phone": "+1-555-111-2222",
      "location": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    },
    "estimated_arrival": "2024-01-15T11:15:00Z"
  }
}`,

    sdkExample: `// Install the SDK
npm install @ecoquick/node-sdk

// Initialize the client
const EcoQuick = require('@ecoquick/node-sdk');
const client = new EcoQuick('your_api_key');

// Create a delivery
const delivery = await client.deliveries.create({
  pickup: {
    address: '123 Main St, San Francisco, CA 94105',
    contact: { name: 'John Doe', phone: '+1-555-123-4567' }
  },
  delivery: {
    address: '456 Oak Ave, San Francisco, CA 94102',
    contact: { name: 'Jane Smith', phone: '+1-555-987-6543' }
  },
  package: {
    size: 'medium',
    weight: 2.5,
    description: 'Documents'
  }
});

console.log('Delivery created:', delivery.id);`,
  };

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
                Developer Resources
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                EcoQuick
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  API Documentation
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Integrate reliable, fast delivery into your applications with
                our comprehensive REST API. Built for developers, designed for
                scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                  asChild
                >
                  <Link to="/contact">Get API Access</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                API Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to build powerful delivery applications
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-brand-violet" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Get API Access
                      </h3>
                      <p className="text-gray-600">
                        Sign up for a business account and request API access
                        from your dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Get Your API Key
                      </h3>
                      <p className="text-gray-600">
                        Once approved, you'll receive your API key and access to
                        sandbox environment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Make Your First Request
                      </h3>
                      <p className="text-gray-600">
                        Start with a quote request to test the integration and
                        get familiar with the API.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Reference */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              API Reference
            </h2>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Base URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      https://api.ecoquick.com/v1
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      All API requests must include your API key in the
                      Authorization header:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      Authorization: Bearer YOUR_API_KEY
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rate Limits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-brand-violet">
                          1,000
                        </div>
                        <div className="text-sm text-gray-600">
                          requests/hour
                        </div>
                        <div className="text-xs text-gray-500">
                          Starter Plan
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-brand-violet">
                          5,000
                        </div>
                        <div className="text-sm text-gray-600">
                          requests/hour
                        </div>
                        <div className="text-xs text-gray-500">
                          Professional Plan
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-brand-violet">
                          Unlimited
                        </div>
                        <div className="text-sm text-gray-600">
                          requests/hour
                        </div>
                        <div className="text-xs text-gray-500">
                          Enterprise Plan
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="endpoints" className="space-y-6">
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant={
                                endpoint.method === "GET"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                endpoint.method === "GET"
                                  ? "bg-green-100 text-green-700"
                                  : endpoint.method === "POST"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-orange-100 text-orange-700"
                              }
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="font-mono text-sm">
                              {endpoint.endpoint}
                            </code>
                            {endpoint.auth && (
                              <Badge variant="outline" className="text-xs">
                                <Key className="w-3 h-3 mr-1" />
                                Auth Required
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">
                          {endpoint.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Create a Delivery
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(codeExamples.createDelivery, "create")
                        }
                      >
                        {copiedCode === "create" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.createDelivery}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Track a Delivery
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(codeExamples.trackDelivery, "track")
                        }
                      >
                        {copiedCode === "track" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.trackDelivery}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Node.js SDK Example
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(codeExamples.sdkExample, "sdk")
                        }
                      >
                        {copiedCode === "sdk" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.sdkExample}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Configure webhook endpoints to receive real-time
                      notifications about delivery status changes.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <code className="text-sm">delivery.created</code>
                        <span className="text-sm text-gray-600">
                          New delivery created
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <code className="text-sm">delivery.status_updated</code>
                        <span className="text-sm text-gray-600">
                          Delivery status changed
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <code className="text-sm">delivery.completed</code>
                        <span className="text-sm text-gray-600">
                          Delivery completed
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <code className="text-sm">delivery.cancelled</code>
                        <span className="text-sm text-gray-600">
                          Delivery cancelled
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Example Webhook Payload
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(codeExamples.webhook, "webhook")
                        }
                      >
                        {copiedCode === "webhook" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.webhook}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Support Resources */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Developer Guides
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step tutorials and integration guides
                </p>
                <Button variant="outline" size="sm">
                  View Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Code className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  SDKs & Libraries
                </h3>
                <p className="text-gray-600 mb-4">
                  Official SDKs for popular programming languages
                </p>
                <Button variant="outline" size="sm">
                  Download SDKs
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Developer Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Join our Discord community for support and discussions
                </p>
                <Button variant="outline" size="sm">
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiDocs;

import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileCheck,
  Camera,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  CreditCard,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Security = () => {
  const securityFeatures = [
    {
      icon: UserCheck,
      title: "Driver Background Checks",
      description:
        "All drivers undergo comprehensive background checks including criminal history, driving record verification, and identity verification before approval.",
      details: [
        "Multi-state criminal background checks",
        "Motor vehicle record verification",
        "Identity and social security verification",
        "Professional reference checks",
        "Annual re-screening for active drivers",
      ],
    },
    {
      icon: MapPin,
      title: "Real-Time GPS Tracking",
      description:
        "Every delivery is tracked in real-time using GPS technology, providing complete visibility into package location and driver route.",
      details: [
        "Live GPS tracking during delivery",
        "Route optimization and monitoring",
        "Geofenced pickup and delivery zones",
        "Historical route data retention",
        "Emergency location sharing",
      ],
    },
    {
      icon: Camera,
      title: "Photo Verification",
      description:
        "Drivers take photos at pickup and delivery to verify package condition and successful completion of each delivery.",
      details: [
        "Timestamped pickup photos",
        "Delivery confirmation photos",
        "Package condition documentation",
        "Secure photo storage and encryption",
        "Photo access for dispute resolution",
      ],
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description:
        "All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols.",
      details: [
        "256-bit SSL/TLS encryption",
        "End-to-end encrypted communications",
        "Encrypted database storage",
        "PCI DSS compliant payment processing",
        "Regular security audits",
      ],
    },
    {
      icon: Smartphone,
      title: "Two-Factor Authentication",
      description:
        "Enhanced account security through optional two-factor authentication for both customers and drivers.",
      details: [
        "SMS-based verification codes",
        "Authenticator app support",
        "Biometric authentication options",
        "Device registration and management",
        "Suspicious activity alerts",
      ],
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description:
        "Our security team monitors all deliveries 24/7 to detect and respond to any suspicious activity or safety concerns.",
      details: [
        "Real-time delivery monitoring",
        "Automated anomaly detection",
        "Emergency response protocols",
        "Direct communication with drivers",
        "Incident escalation procedures",
      ],
    },
  ];

  const insuranceCoverage = [
    {
      type: "Package Protection",
      coverage: "Up to $500 per package",
      description: "Coverage for lost, damaged, or stolen packages",
      included: "All deliveries",
    },
    {
      type: "Enhanced Protection",
      coverage: "Up to $2,500 per package",
      description: "Higher coverage for valuable items",
      included: "Premium deliveries",
    },
    {
      type: "Business Coverage",
      coverage: "Up to $10,000 per package",
      description: "Enterprise-level coverage for business shipments",
      included: "Business accounts",
    },
    {
      type: "Driver Liability",
      coverage: "$1M general liability",
      description: "Coverage for driver-related incidents",
      included: "All drivers",
    },
  ];

  const safetyProcedures = [
    {
      icon: FileCheck,
      title: "Contactless Delivery",
      description:
        "Safe delivery options including contactless drop-off, signature alternatives, and photo confirmation.",
    },
    {
      icon: AlertTriangle,
      title: "Emergency Protocols",
      description:
        "Comprehensive emergency response procedures for driver safety, package security, and customer protection.",
    },
    {
      icon: Clock,
      title: "Delivery Time Limits",
      description:
        "Drivers must complete deliveries within specified time windows to ensure package security and customer safety.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Regular quality checks, customer feedback monitoring, and driver performance reviews to maintain high standards.",
    },
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls",
      status: "Certified",
    },
    {
      name: "PCI DSS Level 1",
      description: "Payment card industry data security standards",
      status: "Compliant",
    },
    {
      name: "GDPR Compliant",
      description: "European data protection regulation compliance",
      status: "Compliant",
    },
    {
      name: "CCPA Compliant",
      description: "California consumer privacy act compliance",
      status: "Compliant",
    },
  ];

  const reportIncident = () => {
    // Handle incident reporting
    console.log("Opening incident reporting...");
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
                Trust & Safety
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Security &
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  Safety First
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Your safety and security are our top priorities. Learn about the
                comprehensive measures we take to protect you, your packages,
                and our driver community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                  onClick={reportIncident}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report an Incident
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8"
                  asChild
                >
                  <Link to="/help">Safety Guidelines</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Security Overview */}
          <div className="mb-16">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  99.9% Safe Deliveries
                </h3>
                <p className="text-sm text-gray-600">
                  Industry-leading safety record
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  100% Verified Drivers
                </h3>
                <p className="text-sm text-gray-600">
                  Background checked and trained
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  24/7 Monitoring
                </h3>
                <p className="text-sm text-gray-600">
                  Real-time security oversight
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bank-Level Encryption
                </h3>
                <p className="text-sm text-gray-600">Your data is secure</p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Security Features
              </h2>
              <p className="text-xl text-gray-600">
                Multi-layered security approach to protect every delivery
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Insurance Coverage */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Insurance Coverage
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive protection for your packages and peace of mind
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceCoverage.map((coverage, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {coverage.type}
                    </h3>
                    <div className="text-2xl font-bold text-brand-violet mb-2">
                      {coverage.coverage}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {coverage.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-brand-violet border-brand-violet/30"
                    >
                      {coverage.included}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Safety Procedures */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Safety Procedures
              </h2>
              <p className="text-xl text-gray-600">
                Standardized procedures to ensure safe and secure deliveries
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyProcedures.map((procedure, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                      <procedure.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {procedure.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {procedure.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compliance Certifications */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Compliance & Certifications
              </h2>
              <p className="text-xl text-gray-600">
                Industry-standard certifications and regulatory compliance
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {cert.description}
                    </p>
                    <Badge className="bg-green-100 text-green-700">
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Emergency Support
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you encounter any safety concerns or emergency situations
              during a delivery, contact our 24/7 emergency support line
              immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white h-12 px-8"
              >
                Call Emergency: 1-800-ECO-911
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-red-300 text-red-700 hover:bg-red-50"
                onClick={reportIncident}
              >
                Report Incident Online
              </Button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <FileCheck className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Safety Guidelines
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Comprehensive safety guidelines for customers and drivers
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/help">View Guidelines</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Security Updates
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Latest security enhancements and system updates
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/blog">Read Updates</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Smartphone className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Account Security
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Manage your account security settings and preferences
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/settings">Security Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;

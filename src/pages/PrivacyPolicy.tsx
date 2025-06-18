import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Privacy Policy
                </h1>
                <p className="text-gray-600">Last updated: January 1, 2024</p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  EcoQuick ("we," "our," or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our
                  delivery platform and related services.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Please read this Privacy Policy carefully. If you do not agree
                  with the terms of this Privacy Policy, please do not access or
                  use our Service.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Information We Collect
                </h2>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Register for an account</li>
                  <li>Request delivery services</li>
                  <li>Contact our customer support</li>
                  <li>Subscribe to our newsletters or communications</li>
                  <li>Apply to become a driver</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.2 Types of Personal Information
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Contact Information:</strong> Name, email address,
                    phone number, mailing address
                  </li>
                  <li>
                    <strong>Account Information:</strong> Username, password,
                    profile picture
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Credit card details,
                    billing address
                  </li>
                  <li>
                    <strong>Delivery Information:</strong> Pickup and delivery
                    addresses, package details
                  </li>
                  <li>
                    <strong>Driver Information:</strong> Driver's license,
                    vehicle information, insurance details
                  </li>
                  <li>
                    <strong>Location Data:</strong> GPS coordinates for delivery
                    tracking (with consent)
                  </li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.3 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>Usage data (pages visited, time spent, features used)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Log data (access times, error logs, performance data)</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Providing and maintaining our delivery services</li>
                  <li>Processing payments and managing accounts</li>
                  <li>Communicating with users about orders and updates</li>
                  <li>Matching customers with appropriate drivers</li>
                  <li>Providing real-time tracking and notifications</li>
                  <li>Improving our services and user experience</li>
                  <li>Preventing fraud and ensuring platform security</li>
                  <li>Complying with legal obligations</li>
                  <li>Sending promotional communications (with consent)</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Information Sharing and Disclosure
                </h2>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  4.1 Service Providers
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We may share your information with third-party service
                  providers who perform services on our behalf, such as payment
                  processing, data analysis, email delivery, hosting services,
                  and customer service.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                  4.2 Between Users
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To facilitate deliveries, we share limited information between
                  customers and drivers, including names, contact information,
                  and delivery locations.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                  4.3 Legal Requirements
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We may disclose your information if required to do so by law
                  or in response to valid requests by public authorities.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                  4.4 Business Transfers
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred as part of that transaction.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  However, no method of transmission over the Internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Data Retention
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law. When we no longer need your information, we
                  will securely delete or anonymize it.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Your Privacy Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Access:</strong> Request copies of your personal
                    information
                  </li>
                  <li>
                    <strong>Rectification:</strong> Request correction of
                    inaccurate information
                  </li>
                  <li>
                    <strong>Erasure:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data
                    to another service
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing of your
                    personal information
                  </li>
                  <li>
                    <strong>Restriction:</strong> Request limitation of
                    processing
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the
                  information provided below.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance
                  your experience on our platform. Cookies are small data files
                  stored on your device that help us provide and improve our
                  services.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You can control cookies through your browser settings.
                  However, disabling cookies may affect your ability to use
                  certain features of our Service.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Children's Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our Service is not intended for children under the age of 18.
                  We do not knowingly collect personal information from children
                  under 18. If you are a parent or guardian and believe your
                  child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. Significant
                  changes will be communicated via email or prominent notice on
                  our platform.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@ecoquick.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> (415) 555-0123
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> 123 Market Street, San Francisco,
                    CA 94102
                  </p>
                  <p className="text-gray-700">
                    <strong>Privacy Officer:</strong> privacy@ecoquick.com
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;

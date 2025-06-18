import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Terms of Service
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
                  Welcome to EcoQuick ("we," "our," or "us"). These Terms of
                  Service ("Terms") govern your use of the EcoQuick delivery
                  platform, including our website, mobile applications, and
                  related services (collectively, the "Service").
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By accessing or using our Service, you agree to be bound by
                  these Terms. If you disagree with any part of these terms,
                  then you may not access the Service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Service Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  EcoQuick provides an on-demand delivery platform that connects
                  customers who need packages delivered with independent
                  drivers. Our Service includes:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Package pickup and delivery coordination</li>
                  <li>Real-time tracking and updates</li>
                  <li>Payment processing</li>
                  <li>Customer support services</li>
                  <li>Driver matching and communication tools</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. User Accounts
                </h2>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  3.1 Account Creation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To use certain features of our Service, you must register for
                  an account. You agree to provide accurate, current, and
                  complete information during registration and to update such
                  information to keep it accurate, current, and complete.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                  3.2 Account Security
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  You are responsible for safeguarding the password and for
                  maintaining the security of your account. You agree not to
                  disclose your password to any third party and to take sole
                  responsibility for any activities or actions under your
                  account.
                </p>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. User Responsibilities
                </h2>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  4.1 Customers
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide accurate pickup and delivery information</li>
                  <li>
                    Ensure packages comply with size, weight, and content
                    restrictions
                  </li>
                  <li>Be available for package pickup and delivery</li>
                  <li>Pay all fees and charges promptly</li>
                  <li>Treat drivers with respect and professionalism</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                  4.2 Drivers
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Maintain valid driver's license and vehicle insurance</li>
                  <li>Handle packages with care and professionalism</li>
                  <li>Follow all traffic laws and safety regulations</li>
                  <li>Provide timely and reliable delivery service</li>
                  <li>Maintain confidentiality of customer information</li>
                </ul>
              </section>

              {/* Prohibited Items */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Prohibited Items
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following items are strictly prohibited from being
                  transported through our Service:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Illegal substances or contraband</li>
                  <li>Hazardous materials or chemicals</li>
                  <li>Weapons, ammunition, or explosives</li>
                  <li>Live animals</li>
                  <li>Perishable food items requiring refrigeration</li>
                  <li>Fragile items without proper packaging</li>
                  <li>Items exceeding size or weight limits</li>
                  <li>Cash or monetary instruments</li>
                </ul>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Payment Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Payment for delivery services is due at the time of booking.
                  We accept major credit cards and other payment methods as
                  displayed in our app. All prices are in USD and include
                  applicable taxes and fees.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Refunds may be issued at our discretion for cancelled or
                  undelivered orders. Driver payments are processed according to
                  our driver agreement and payment schedule.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  EcoQuick's liability for any delivery is limited to the
                  declared value of the package, up to a maximum of $500 USD. We
                  are not liable for indirect, incidental, special,
                  consequential, or punitive damages.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We provide delivery coordination services and are not
                  responsible for the actions of independent drivers. However,
                  we maintain insurance coverage for deliveries in transit.
                </p>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Privacy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the Service, to
                  understand our practices regarding the collection and use of
                  your personal information.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Termination
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may terminate or suspend your account and bar access to the
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever, including but
                  not limited to a breach of the Terms.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any
                  time. If a revision is material, we will provide at least 30
                  days notice prior to any new terms taking effect.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@ecoquick.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> (415) 555-0123
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> 123 Market Street, San Francisco,
                    CA 94102
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

export default TermsOfService;

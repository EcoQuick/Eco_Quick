import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Cookie Policy
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
                  1. What Are Cookies?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files that are stored on your device
                  (computer, tablet, or mobile) when you visit our website. They
                  are widely used to make websites work more efficiently and to
                  provide information to website owners.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  EcoQuick uses cookies and similar tracking technologies to
                  enhance your experience on our platform, provide personalized
                  content, and analyze website performance.
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Types of Cookies We Use
                </h2>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  2.1 Essential Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies are necessary for the website to function
                  properly. They enable core functionality such as security,
                  network management, and accessibility.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Authentication and login status</li>
                  <li>Session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.2 Performance Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies collect information about how visitors use our
                  website, helping us improve performance and user experience.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Page load times and performance metrics</li>
                  <li>Error tracking and debugging</li>
                  <li>Popular pages and content</li>
                  <li>User flow and navigation patterns</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.3 Functional Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies enable enhanced functionality and
                  personalization features.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Language and region preferences</li>
                  <li>Saved addresses and delivery preferences</li>
                  <li>User interface customization</li>
                  <li>Recently viewed items</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.4 Analytics Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies help us understand how users interact with our
                  website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Google Analytics for website traffic analysis</li>
                  <li>User behavior and engagement metrics</li>
                  <li>Conversion tracking and optimization</li>
                  <li>A/B testing and feature usage</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  2.5 Marketing Cookies
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies are used to deliver relevant advertisements and
                  track advertising effectiveness (with your consent).
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Personalized advertising</li>
                  <li>Retargeting and remarketing</li>
                  <li>Social media integration</li>
                  <li>Third-party advertising networks</li>
                </ul>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Third-Party Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We work with trusted third-party service providers who may
                  also set cookies on our website:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">
                      Google Analytics
                    </h4>
                    <p className="text-sm text-gray-700">
                      Helps us analyze website traffic and user behavior
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Stripe</h4>
                    <p className="text-sm text-gray-700">
                      Processes payments securely and prevents fraud
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Mapbox</h4>
                    <p className="text-sm text-gray-700">
                      Provides mapping and location services
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">Intercom</h4>
                    <p className="text-sm text-gray-700">
                      Powers our customer support chat
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookie Management */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Managing Your Cookie Preferences
                </h2>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  4.1 Browser Settings
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their
                  settings. You can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Receive notification before cookies are stored</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  4.2 Browser-Specific Instructions
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies and other site data
                  </p>
                  <p>
                    <strong>Firefox:</strong> Options → Privacy & Security →
                    Cookies and Site Data
                  </p>
                  <p>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and
                    website data
                  </p>
                  <p>
                    <strong>Edge:</strong> Settings → Cookies and site
                    permissions → Cookies and stored data
                  </p>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2 mt-6">
                  4.3 Opt-Out Links
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Google Analytics:</strong>{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      className="text-brand-violet hover:underline"
                    >
                      Google Analytics Opt-out
                    </a>
                  </p>
                  <p>
                    <strong>General Advertising:</strong>{" "}
                    <a
                      href="http://www.aboutads.info/choices/"
                      className="text-brand-violet hover:underline"
                    >
                      Network Advertising Initiative
                    </a>
                  </p>
                </div>
              </section>

              {/* Impact of Disabling Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Impact of Disabling Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While you can disable cookies, please note that doing so may
                  affect your experience on our website:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Some features may not work properly</li>
                  <li>You may need to re-enter information</li>
                  <li>Personalization features will be limited</li>
                  <li>We won't be able to remember your preferences</li>
                  <li>Some pages may load more slowly</li>
                </ul>
              </section>

              {/* Cookie Consent */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Cookie Consent
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  When you first visit our website, we'll ask for your consent
                  to use non-essential cookies. You can:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                  <li>Accept all cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Reject non-essential cookies</li>
                  <li>Change your preferences at any time</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Your consent choices are stored locally and will be remembered
                  for future visits.
                </p>
              </section>

              {/* Updates to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Updates to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect
                  changes in technology, legislation, or our practices. We will
                  notify you of any significant changes by posting a notice on
                  our website or sending you an email.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about our use of cookies or this
                  Cookie Policy, please contact us:
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
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;

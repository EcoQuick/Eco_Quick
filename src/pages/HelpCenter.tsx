import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  ArrowLeft,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Package className="w-5 h-5" />,
      faqs: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking 'Get Started' in the top right corner of our homepage. Choose between a customer or driver account and fill in your details. For customers, you only need basic information. For drivers, additional verification is required.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "EcoQuick currently operates in San Francisco, Oakland, San Jose, and surrounding Bay Area cities. We're expanding to new cities regularly. Check our coverage area on the homepage map or enter your address to see if we deliver to your location.",
        },
        {
          question: "How much does delivery cost?",
          answer:
            'Delivery costs start at $5 base fee plus additional charges based on package size, weight, and distance. Small packages (up to 12"x12"x6") have a $3 size fee, medium packages ($8), and large packages ($15). Weight over 5 lbs adds $2 per additional pound.',
        },
      ],
    },
    {
      title: "Placing Orders",
      icon: <MapPin className="w-5 h-5" />,
      faqs: [
        {
          question: "How do I request a delivery?",
          answer:
            "Use our quote calculator on the homepage to enter pickup and delivery addresses, select package size and weight. You'll get an instant price quote. Click 'Book Now' to proceed to checkout, enter your details, and pay securely.",
        },
        {
          question: "What can I send?",
          answer:
            'You can send most items including documents, packages, food, gifts, and personal belongings. Prohibited items include hazardous materials, illegal substances, live animals, cash, and items exceeding our size/weight limits (24"x24"x18", 50 lbs max).',
        },
        {
          question: "How quickly will my package be delivered?",
          answer:
            "Most deliveries are completed within 30-60 minutes of booking. During peak hours or bad weather, delivery times may be slightly longer. You'll receive an estimated delivery time when you book and real-time updates as your driver approaches.",
        },
      ],
    },
    {
      title: "Tracking & Delivery",
      icon: <Clock className="w-5 h-5" />,
      faqs: [
        {
          question: "How can I track my delivery?",
          answer:
            "After booking, you'll receive a tracking link via email and SMS. You can also log into your account and view real-time tracking on a map. You'll see your driver's location, estimated arrival time, and delivery status updates.",
        },
        {
          question: "What if I'm not available for pickup or delivery?",
          answer:
            "Please ensure someone is available at both pickup and delivery locations during the scheduled time. If you're unavailable, contact your driver directly or our support team. Additional waiting time may incur extra charges after 5 minutes.",
        },
        {
          question: "Can I change my delivery address after booking?",
          answer:
            "Address changes are possible before your driver picks up the package. Contact our support team immediately. Changes may result in price adjustments based on the new distance and delivery location.",
        },
      ],
    },
    {
      title: "Payment & Billing",
      icon: <CreditCard className="w-5 h-5" />,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and digital wallets like Apple Pay and Google Pay. All payments are processed securely through Stripe.",
        },
        {
          question: "When am I charged?",
          answer:
            "Payment is processed immediately when you complete your booking. You'll receive an email receipt with the breakdown of charges. No hidden fees - the price you see at checkout is final.",
        },
        {
          question: "What is your refund policy?",
          answer:
            "Full refunds are provided for cancelled orders before driver pickup. If delivery fails due to our error, you'll receive a full refund. For other issues, we evaluate refunds case-by-case and may offer credits or partial refunds.",
        },
      ],
    },
    {
      title: "Driver Information",
      icon: <Truck className="w-5 h-5" />,
      faqs: [
        {
          question: "How do I become a driver?",
          answer:
            "Click 'Become a Driver' in our navigation menu to start the application process. You'll need a valid driver's license, vehicle insurance, clean driving record, and must be 21+. The approval process typically takes 2-3 business days.",
        },
        {
          question: "How much can drivers earn?",
          answer:
            "Driver earnings vary based on time worked, number of deliveries, and tips. Most drivers earn $15-25 per hour including base pay, delivery fees, and tips. You keep 100% of tips and are paid weekly.",
        },
        {
          question: "What vehicle requirements do you have?",
          answer:
            "You can drive a car, motorcycle, scooter, or even bicycle depending on your city. Vehicles must be insured, registered, and in good working condition. We provide insulated bags for food deliveries.",
        },
      ],
    },
  ];

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "Available 24/7",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with a support representative",
      action: "Call (415) 555-0123",
      availability: "Mon-Fri 8AM-8PM PST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      action: "Email support@ecoquick.com",
      availability: "Response within 24 hours",
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                How can we help you?
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions or get in touch with our
                support team
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <Button variant="outline" className="w-full mb-2">
                    {option.action}
                  </Button>
                  <p className="text-xs text-gray-500">{option.availability}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing results for "{searchQuery}" (
                  {filteredFAQs.reduce(
                    (total, category) => total + category.faqs.length,
                    0,
                  )}{" "}
                  found)
                </p>
              </div>
            )}

            <div className="space-y-8">
              {(searchQuery ? filteredFAQs : faqCategories).map(
                (category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center mr-3 text-white">
                          {category.icon}
                        </div>
                        {category.title}
                        <Badge variant="outline" className="ml-auto">
                          {category.faqs.length} articles
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                          >
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>

            {searchQuery && filteredFAQs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try different keywords or contact our support team for help
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Still Need Help */}
          <Card className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 border-brand-violet/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still need help?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our friendly support team is here to help you with any questions
                or issues you might have. We're available 24/7 to ensure your
                EcoQuick experience is smooth and hassle-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;

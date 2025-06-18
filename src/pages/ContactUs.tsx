import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  MessageCircle,
  Send,
  Building,
  Truck,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showErrorNotification(
        "Missing Information",
        "Please fill in all required fields.",
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccessNotification(
        "Message Sent!",
        "Thank you for contacting us. We'll get back to you within 24 hours.",
      );
      // Reset form
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak with our support team",
      details: "(415) 555-0123",
      availability: "Mon-Fri: 8AM-8PM PST\nSat-Sun: 9AM-6PM PST",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      details: "support@ecoquick.com",
      availability: "Response within 24 hours",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help online",
      details: "Available on our website",
      availability: "24/7 - Always available",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Address",
      description: "Visit our headquarters",
      details: "123 Market Street\nSan Francisco, CA 94102",
      availability: "Mon-Fri: 9AM-5PM PST",
    },
  ];

  const quickActions = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help Center",
      description: "Browse our FAQ and guides",
      link: "/help",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Track Package",
      description: "Check your delivery status",
      link: "/track",
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Become a Driver",
      description: "Join our driver network",
      link: "/driver/signup",
    },
  ];

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
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're here to help! Reach out to our team for any questions,
                support, or feedback.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={contactForm.category}
                          onValueChange={(value) =>
                            setContactForm({ ...contactForm, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="support">
                              Customer Support
                            </SelectItem>
                            <SelectItem value="driver">
                              Driver Support
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                            <SelectItem value="press">Press & Media</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="bug">Report a Bug</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            subject: e.target.value,
                          })
                        }
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {method.description}
                          </p>
                          <p className="font-medium text-gray-900 mb-1 whitespace-pre-line">
                            {method.details}
                          </p>
                          <p className="text-xs text-gray-500 whitespace-pre-line">
                            {method.availability}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <Link to={action.link}>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            {action.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-gray-600">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monday - Friday</span>
                      <span className="font-medium">8:00 AM - 8:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Saturday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sunday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Live Chat</span>
                        <span className="font-medium text-green-600">
                          24/7 Available
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 mb-2">
                    🚨 Emergency or Urgent Issues
                  </h3>
                  <p className="text-red-700 text-sm mb-3">
                    For delivery emergencies, lost packages, or urgent safety
                    concerns:
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-100"
                    asChild
                  >
                    <a href="tel:+14155550911">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Hotline: (415) 555-0911
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;

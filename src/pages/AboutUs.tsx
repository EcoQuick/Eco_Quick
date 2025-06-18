import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  Users,
  Globe,
  Award,
  Truck,
  Shield,
  MapPin,
  Clock,
  Star,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const stats = [
    { label: "Deliveries Completed", value: "50,000+", icon: Package },
    { label: "Cities Served", value: "25+", icon: MapPin },
    { label: "Active Drivers", value: "2,500+", icon: Truck },
    { label: "Customer Rating", value: "4.9/5", icon: Star },
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former logistics executive with 10+ years experience in supply chain optimization.",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Tech veteran who previously led engineering teams at major delivery platforms.",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Emily Johnson",
      role: "Head of Operations",
      bio: "Expert in fleet management and operational efficiency with background in logistics.",
      image: "/api/placeholder/150/150",
    },
    {
      name: "David Park",
      role: "Head of Driver Experience",
      bio: "Passionate about creating the best possible experience for our driver partners.",
      image: "/api/placeholder/150/150",
    },
  ];

  const values = [
    {
      icon: Zap,
      title: "Speed",
      description:
        "We believe time is precious. Our commitment to 30-60 minute delivery windows means you get your packages when you need them.",
    },
    {
      icon: Shield,
      title: "Reliability",
      description:
        "Every package is insured and tracked. Our verified drivers undergo thorough background checks for your peace of mind.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "We're building a community of drivers and customers who care about each other and the environment.",
    },
    {
      icon: Target,
      title: "Sustainability",
      description:
        "By optimizing routes and promoting eco-friendly transport, we're reducing our carbon footprint with every delivery.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description:
        "EcoQuick was born from a vision to revolutionize last-mile delivery with speed and sustainability.",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description:
        "Raised $15M to expand operations and enhance our technology platform.",
    },
    {
      year: "2023",
      title: "Multi-City Launch",
      description:
        "Expanded from 3 cities to 25+ metropolitan areas across the country.",
    },
    {
      year: "2024",
      title: "Enterprise Solutions",
      description:
        "Launched B2B platform serving 500+ business customers with dedicated fleet management.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                About EcoQuick
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to make delivery fast, reliable, and
                sustainable. Founded in 2022, we're transforming how packages
                move through cities.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 rounded-2xl p-8 border border-brand-violet/10">
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                To create the fastest, most reliable, and sustainable delivery
                network that connects communities while empowering drivers to
                earn a living wage. We believe technology should make life
                easier for everyone - customers, drivers, and businesses alike.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Journey
            </h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {milestone.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {milestone.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-brand-violet border-brand-violet/30"
                    >
                      {milestone.year}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-brand-violet font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recognition Section */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recognition & Awards
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-brand-violet mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Best Delivery App 2024
                </h3>
                <p className="text-sm text-gray-600">
                  TechCrunch Startup Awards
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-12 h-12 text-brand-violet mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Sustainability Leader
                </h3>
                <p className="text-sm text-gray-600">Green Business Council</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-brand-violet mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Top Workplace 2024
                </h3>
                <p className="text-sm text-gray-600">Best Places to Work</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Mission
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're looking to send a package, become a driver, or
              partner with us, we'd love to have you as part of the EcoQuick
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                asChild
              >
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                <Link to="/careers">View Careers</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;

import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Code,
  Truck,
  Headphones,
  BarChart3,
  Heart,
  Coffee,
  Gamepad2,
  GraduationCap,
  Plane,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      level: "Senior",
      description:
        "Build scalable delivery platform infrastructure and optimize routing algorithms.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      level: "Mid-level",
      description:
        "Design intuitive experiences for customers, drivers, and business users.",
    },
    {
      title: "Operations Manager",
      department: "Operations",
      location: "Austin, TX",
      type: "Full-time",
      level: "Senior",
      description:
        "Scale delivery operations and manage driver network in key markets.",
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      level: "Entry",
      description:
        "Help business customers maximize value from our delivery platform.",
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      level: "Mid-level",
      description:
        "Analyze delivery patterns and build predictive models for route optimization.",
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      level: "Senior",
      description:
        "Build and maintain reliable infrastructure supporting millions of deliveries.",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive medical, dental, and vision insurance plus wellness programs and mental health support.",
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description:
        "Top-tier salary, equity packages, and performance bonuses aligned with company success.",
    },
    {
      icon: Plane,
      title: "Flexible Time Off",
      description:
        "Unlimited PTO policy plus company holidays and sabbatical opportunities after 3 years.",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description:
        "$3,000 annual learning budget for conferences, courses, and professional development.",
    },
    {
      icon: Coffee,
      title: "Remote-First Culture",
      description:
        "Work from anywhere with home office stipend and co-working space memberships.",
    },
    {
      icon: Gamepad2,
      title: "Work-Life Balance",
      description:
        "Flexible hours, no-meeting Fridays, and regular team events and retreats.",
    },
  ];

  const departments = [
    {
      icon: Code,
      name: "Engineering",
      description: "Build the technology that powers millions of deliveries",
      openings: 8,
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: BarChart3,
      name: "Product & Design",
      description: "Create intuitive experiences for all our users",
      openings: 3,
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: Truck,
      name: "Operations",
      description: "Scale and optimize our delivery network",
      openings: 5,
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Headphones,
      name: "Customer Success",
      description: "Help customers succeed with our platform",
      openings: 4,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const values = [
    {
      title: "Move Fast",
      description:
        "We ship quickly and iterate based on real customer feedback. Speed is in our DNA.",
    },
    {
      title: "Think Customer First",
      description:
        "Every decision starts with how we can better serve our customers and drivers.",
    },
    {
      title: "Own the Outcome",
      description:
        "We take responsibility for results and see challenges as opportunities to improve.",
    },
    {
      title: "Build Together",
      description:
        "Diverse perspectives make us stronger. We succeed as a team.",
    },
  ];

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "Engineering":
        return <Code className="w-4 h-4" />;
      case "Design":
        return <BarChart3 className="w-4 h-4" />;
      case "Operations":
        return <Truck className="w-4 h-4" />;
      case "Customer Success":
        return <Headphones className="w-4 h-4" />;
      case "Data & Analytics":
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Design":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Operations":
        return "bg-green-100 text-green-700 border-green-200";
      case "Customer Success":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Data & Analytics":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join the
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  EcoQuick Team
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Help us revolutionize delivery and build the future of last-mile
                logistics. We're looking for passionate people who want to make
                a real impact.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
              >
                <a href="#open-positions">View Open Positions</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Company Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-violet mb-2">
                150+
              </div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-violet mb-2">
                $50M
              </div>
              <div className="text-gray-600">Series B Funding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-violet mb-2">
                25+
              </div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-violet mb-2">
                4.8★
              </div>
              <div className="text-gray-600">Glassdoor Rating</div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide how we work and grow together
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <p className="text-xl text-gray-600">
                We invest in our team's success and well-being
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-violet to-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Departments
              </h2>
              <p className="text-xl text-gray-600">
                Explore opportunities across different teams
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div
                      className={`w-12 h-12 ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <dept.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {dept.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-brand-violet border-brand-violet/30"
                    >
                      {dept.openings} open positions
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div id="open-positions" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600">
                Find your next opportunity to make an impact
              </p>
            </div>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {position.title}
                          </h3>
                          <Badge
                            className={getDepartmentColor(position.department)}
                          >
                            {getDepartmentIcon(position.department)}
                            <span className="ml-1">{position.department}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {position.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {position.type}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {position.level}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="ml-6 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                        asChild
                      >
                        <Link to="/contact">Apply Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Culture */}
          <div className="bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Life at EcoQuick
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're building more than just a delivery platform - we're creating
              a culture where everyone can do their best work and grow their
              career. Join us in shaping the future of logistics.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Shield className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Inclusive Environment
                </h3>
                <p className="text-sm text-gray-600">
                  Diverse perspectives and backgrounds are celebrated and valued
                </p>
              </div>
              <div className="text-center">
                <GraduationCap className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Growth Mindset
                </h3>
                <p className="text-sm text-gray-600">
                  Continuous learning and development opportunities for everyone
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-brand-violet mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Work-Life Balance
                </h3>
                <p className="text-sm text-gray-600">
                  Flexible schedules and remote-first culture for better balance
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white h-12 px-8"
                asChild
              >
                <Link to="/contact">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;

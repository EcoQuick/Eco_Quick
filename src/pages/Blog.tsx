import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Search,
  TrendingUp,
  Truck,
  Code,
  Users,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Product Updates",
    "Engineering",
    "Company News",
    "Industry Insights",
    "Driver Stories",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Introducing Real-Time Package Tracking with Live Driver Location",
      excerpt:
        "We're excited to announce our new real-time tracking feature that lets customers see exactly where their package is during delivery, complete with live driver location updates.",
      category: "Product Updates",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      featured: true,
      tags: ["tracking", "real-time", "customer-experience"],
    },
    {
      id: 2,
      title: "How We Built Our Route Optimization Algorithm",
      excerpt:
        "A deep dive into the machine learning algorithms that power our delivery route optimization, reducing delivery times by 30% and fuel consumption by 25%.",
      category: "Engineering",
      author: "Michael Rodriguez",
      date: "2024-01-12",
      readTime: "8 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["engineering", "machine-learning", "optimization"],
    },
    {
      id: 3,
      title: "EcoQuick Expands to 25 Cities Nationwide",
      excerpt:
        "We're thrilled to announce our expansion into 10 new metropolitan areas, bringing fast, reliable delivery services to millions more customers.",
      category: "Company News",
      author: "Emily Johnson",
      date: "2024-01-10",
      readTime: "3 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["expansion", "growth", "cities"],
    },
    {
      id: 4,
      title: "Driver Spotlight: Maria's Journey from Part-Time to Full-Time",
      excerpt:
        "Meet Maria, one of our top-rated drivers who started part-time and now earns over $60,000 annually while maintaining perfect customer ratings.",
      category: "Driver Stories",
      author: "David Park",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["drivers", "success-story", "earnings"],
    },
    {
      id: 5,
      title: "The Future of Last-Mile Delivery: Trends for 2024",
      excerpt:
        "Our analysis of emerging trends in last-mile delivery, from autonomous vehicles to sustainable packaging, and how they'll shape the industry.",
      category: "Industry Insights",
      author: "Sarah Chen",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["industry", "trends", "future"],
    },
    {
      id: 6,
      title: "Securing Package Delivery: Our Approach to Trust and Safety",
      excerpt:
        "Learn about the comprehensive security measures we've implemented to ensure every package is delivered safely and securely.",
      category: "Product Updates",
      author: "Alex Thompson",
      date: "2024-01-03",
      readTime: "4 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["security", "safety", "trust"],
    },
    {
      id: 7,
      title: "Building for Scale: Our Microservices Architecture",
      excerpt:
        "How we redesigned our backend architecture to handle millions of delivery requests while maintaining 99.9% uptime.",
      category: "Engineering",
      author: "Michael Rodriguez",
      date: "2024-01-01",
      readTime: "10 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["architecture", "scalability", "microservices"],
    },
    {
      id: 8,
      title: "EcoQuick Raises $50M Series B to Accelerate Growth",
      excerpt:
        "We've secured $50M in Series B funding led by top-tier VCs to expand our operations and enhance our technology platform.",
      category: "Company News",
      author: "Sarah Chen",
      date: "2023-12-28",
      readTime: "5 min read",
      image: "/api/placeholder/400/250",
      featured: false,
      tags: ["funding", "growth", "investment"],
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Product Updates":
        return <Zap className="w-4 h-4" />;
      case "Engineering":
        return <Code className="w-4 h-4" />;
      case "Company News":
        return <TrendingUp className="w-4 h-4" />;
      case "Driver Stories":
        return <Truck className="w-4 h-4" />;
      case "Industry Insights":
        return <Globe className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product Updates":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Engineering":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Company News":
        return "bg-green-100 text-green-700 border-green-200";
      case "Driver Stories":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Industry Insights":
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
                EcoQuick
                <span className="block bg-gradient-to-r from-brand-violet to-brand-orange bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Stay updated with the latest news, product updates, and insights
                from the EcoQuick team. Learn about our technology, growth, and
                the future of delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-brand-violet hover:bg-brand-violet/90"
                        : ""
                    }
                  >
                    {category !== "All" && getCategoryIcon(category)}
                    <span className={category !== "All" ? "ml-1" : ""}>
                      {category}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "All" && !searchQuery && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Featured Article
                </h2>
                <p className="text-gray-600">
                  Our latest and most important updates
                </p>
              </div>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={getCategoryColor(featuredPost.category)}
                      >
                        {getCategoryIcon(featuredPost.category)}
                        <span className="ml-1">{featuredPost.category}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                      Read Article
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === "All"
                      ? "Latest Articles"
                      : selectedCategory}
                  </h2>
                  <span className="text-gray-500">
                    {filteredPosts.length} articles
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getCategoryColor(post.category)}>
                            {getCategoryIcon(post.category)}
                            <span className="ml-1">{post.category}</span>
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-brand-violet transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mb-4">
                          <User className="w-3 h-3 mr-1" />
                          <span className="mr-3">{post.author}</span>
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className="mr-3">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:bg-brand-violet group-hover:text-white transition-colors"
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-brand-violet/5 to-brand-orange/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss an update about new
              features, company news, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

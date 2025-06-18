import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Package, Mail, Lock, User, LogIn, Truck } from "lucide-react";
import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get("tab") || "signin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo accounts
  const demoAccounts = {
    customer: {
      email: "customer@demo.com",
      password: "demo123",
      name: "John Smith",
      type: "customer",
    },
    driver: {
      email: "driver@demo.com",
      password: "demo123",
      name: "Sarah Chen",
      type: "driver",
    },
    admin: {
      email: "admin@demo.com",
      password: "admin123",
      name: "Admin User",
      type: "admin",
    },
  };

  const handleDemoLogin = (accountType: "customer" | "driver" | "admin") => {
    const account = demoAccounts[accountType];
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store demo user data in localStorage
      localStorage.setItem("demoUser", JSON.stringify(account));

      showSuccessNotification(
        "Login Successful",
        `Welcome back, ${account.name}!`,
      );

      // Redirect to appropriate dashboard
      if (accountType === "customer") {
        navigate("/customer-dashboard");
      } else if (accountType === "driver") {
        navigate("/driver-dashboard");
      } else if (accountType === "admin") {
        navigate("/admin");
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleRegularLogin = () => {
    setIsLoading(true);

    // Check if credentials match demo accounts
    const customerDemo = demoAccounts.customer;
    const driverDemo = demoAccounts.driver;
    const adminDemo = demoAccounts.admin;

    setTimeout(() => {
      if (email === customerDemo.email && password === customerDemo.password) {
        handleDemoLogin("customer");
      } else if (
        email === driverDemo.email &&
        password === driverDemo.password
      ) {
        handleDemoLogin("driver");
      } else if (email === adminDemo.email && password === adminDemo.password) {
        handleDemoLogin("admin");
      } else {
        showErrorNotification(
          "Login Failed",
          "Invalid credentials. Try the demo accounts below!",
        );
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to EcoQuick
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleRegularLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-violet hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Demo Accounts Section */}
                <div className="space-y-4">
                  <Separator />
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Try Demo Accounts
                    </h3>
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleDemoLogin("customer")}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Demo Customer (John Smith)
                      </Button>
                      <Button
                        onClick={() => handleDemoLogin("driver")}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Demo Driver (Sarah Chen)
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Or use: customer@demo.com / driver@demo.com with password:
                      demo123
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
                    Create Account
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">Or join as a driver</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/driver/signup">Become a Driver</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-brand-violet hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-brand-violet hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;

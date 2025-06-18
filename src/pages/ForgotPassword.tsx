import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/components/NotificationSystem";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showErrorNotification(
        "Email Required",
        "Please enter your email address.",
      );
      return;
    }

    setIsLoading(true);

    // Simulate password reset email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      showSuccessNotification(
        "Reset Link Sent",
        "Check your email for password reset instructions.",
      );
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Check Your Email
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-gray-900">{email}</p>
              <p className="text-sm text-gray-600">
                Check your email and click the link to reset your password. If
                you don't see it, check your spam folder.
              </p>

              <div className="space-y-3 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
                  asChild
                >
                  <Link to="/auth">Back to Sign In</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                >
                  Try Different Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-violet/5 via-white to-brand-orange/5 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-2xl mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Reset Your Password
            </CardTitle>
            <p className="text-gray-600">
              Enter your email and we'll send you a reset link
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending Reset Link...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center">
                <Link
                  to="/auth"
                  className="inline-flex items-center text-sm text-brand-violet hover:text-brand-violet/80"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </form>

            {/* Demo Account Reminder */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-1">
                🚀 Using Demo Accounts?
              </p>
              <p className="text-xs text-blue-700">
                Demo accounts don't need password reset. Use:
              </p>
              <p className="text-xs text-blue-700">
                customer@demo.com or driver@demo.com with password: demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

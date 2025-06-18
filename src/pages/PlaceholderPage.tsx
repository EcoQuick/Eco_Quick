import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  const getSpecificActions = () => {
    if (title.includes("Driver")) {
      return (
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
            asChild
          >
            <Link to="/driver/signup">Start Driver Application</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      );
    }

    if (title.includes("Track")) {
      return (
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
            asChild
          >
            <Link to="/customer-dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/help">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Help
            </Link>
          </Button>
        </div>
      );
    }

    if (title.includes("Pricing")) {
      return (
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
            asChild
          >
            <Link to="/#quote-calculator">Get Instant Quote</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact Sales
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
          asChild
        >
          <Link to="/contact">Contact Us</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-brand-violet to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Construction className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 text-lg">{description}</p>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-1">
                🚧 Page Under Development
              </p>
              <p className="text-xs text-blue-700">
                This feature is coming soon! In the meantime, you can explore
                our other services or contact us for assistance.
              </p>
            </div>

            {getSpecificActions()}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;

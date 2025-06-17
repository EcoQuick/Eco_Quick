import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Lock,
  Package,
  MapPin,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "ECO-2024-001";
  const amount = searchParams.get("amount") || "15.99";

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/order-confirmation?orderId=${orderId}&amount=${amount}`);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/checkout"
              className="inline-flex items-center text-brand-violet hover:text-brand-violet/80 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Checkout
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="text-gray-600">Complete your delivery order</p>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order #{orderId}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Service</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-brand-violet">${amount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Badges */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    We accept:
                  </span>
                  <Badge variant="outline">Visa</Badge>
                  <Badge variant="outline">Mastercard</Badge>
                  <Badge variant="outline">American Express</Badge>
                  <Badge variant="outline">Discover</Badge>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        className="pl-10"
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: formatExpiryDate(e.target.value),
                          })
                        }
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card *</Label>
                    <Input
                      id="nameOnCard"
                      type="text"
                      placeholder="John Doe"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          nameOnCard: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Secure Payment</p>
                      <p>
                        Your payment information is processed securely using
                        256-bit SSL encryption. We never store your credit card
                        details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Complete Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={
                    isProcessing ||
                    !paymentInfo.cardNumber ||
                    !paymentInfo.expiryDate ||
                    !paymentInfo.cvv ||
                    !paymentInfo.nameOnCard
                  }
                  className="w-full h-12 bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Payment - ${amount}
                    </div>
                  )}
                </Button>

                {/* Terms */}
                <div className="text-xs text-gray-500 text-center">
                  By completing this payment, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="text-brand-violet hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-brand-violet hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . Your order will be processed immediately.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;

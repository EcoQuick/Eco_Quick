import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, MessageSquare, ThumbsUp, Send } from "lucide-react";
import { showSuccessNotification } from "./NotificationSystem";

interface RatingSystemProps {
  orderId: string;
  driverName?: string;
  driverPhoto?: string;
  onRatingSubmit?: (rating: number, review: string) => void;
  trigger?: React.ReactNode;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const RatingSystem = ({
  orderId,
  driverName = "Driver",
  driverPhoto = "/api/placeholder/40/40",
  onRatingSubmit,
  trigger,
}: RatingSystemProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onRatingSubmit?.(rating, review);
      showSuccessNotification(
        "Rating Submitted",
        "Thank you for your feedback!",
      );
      setIsSubmitting(false);
      setIsOpen(false);
      setRating(0);
      setReview("");
    }, 1000);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate your experience";
    }
  };

  const defaultTrigger = (
    <Button className="bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white">
      <Star className="w-4 h-4 mr-2" />
      Rate Experience
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Delivery Experience</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Driver Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={driverPhoto}
              alt={driverName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{driverName}</p>
              <p className="text-sm text-gray-600">Your Driver</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">
              How would you rate this delivery?
            </p>
            <div className="flex justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {getRatingText(hoveredRating || rating)}
            </p>
          </div>

          {/* Review Text */}
          {rating > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tell us more about your experience (optional)
              </label>
              <Textarea
                placeholder="Was the driver professional? Did the delivery arrive on time? Any feedback helps us improve..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          )}

          {/* Quick Feedback Tags */}
          {rating > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Quick feedback:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "On time",
                  "Professional",
                  "Careful handling",
                  "Good communication",
                  "Easy to find",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-brand-violet hover:text-white"
                    onClick={() => {
                      if (!review.includes(tag)) {
                        setReview((prev) =>
                          prev ? `${prev}, ${tag}` : tag.toLowerCase(),
                        );
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full bg-gradient-to-r from-brand-violet to-brand-orange hover:from-brand-violet/90 hover:to-brand-orange/90 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Submit Rating
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Component to display existing reviews
export const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">
                  {review.customerName}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
              </div>
            </div>
            {review.comment && (
              <p className="text-gray-700 mb-3">{review.comment}</p>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-brand-violet">
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-brand-violet">
                <MessageSquare className="w-3 h-3" />
                <span>Reply</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RatingSystem;

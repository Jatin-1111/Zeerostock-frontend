"use client";

import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { authService } from "@/services/auth.service";

export default function FeedbackTab() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [feedbackComments, setFeedbackComments] = useState("");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    if (rating === 0) {
      setSubmitError("Please select a rating");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = authService.getAccessToken();

      if (!token) {
        setSubmitError("Please log in to submit feedback.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comments: feedbackComments || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setSubmitError(
            "Your session has expired. Please log out and log back in.",
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit feedback. Please try again.",
          );
        }
        return;
      }

      setSubmitSuccess(true);
      setRating(0);
      setFeedbackComments("");

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Feedback submission error:", error);
      setSubmitError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-2 sm:px-3 md:px-4 lg:px-5">
      {/* Title Section */}
      <div className="mb-4 sm:mb-5 md:mb-[16px]">
        <h2 className="mb-1 sm:mb-2 md:mb-[4px] text-base sm:text-lg md:text-[15px] font-semibold leading-none text-[#0d1b2a] ">
          Share Your Feedback
        </h2>
        <p className="text-xs sm:text-sm md:text-[11px] font-medium leading-none text-[#9c9c9c] ">
          Help us improve your experience on Zeerostock
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-3 sm:mb-3.5 md:mb-[12px] flex items-center gap-1.5 sm:gap-2 md:gap-[6px] rounded-[5px] border border-green-200 bg-green-50 p-2 sm:p-2.5 md:p-[8px]">
          <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-[12px] md:w-[12px] text-green-600 flex-shrink-0" />
          <p className="text-[7px] sm:text-[8px] md:text-[8px] leading-normal text-green-800 ">
            Thank you for your feedback! We appreciate your input.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-3 sm:mb-3.5 md:mb-[12px] rounded-[5px] border border-red-200 bg-red-50 p-2 sm:p-2.5 md:p-[8px]">
          <p className="text-[7px] sm:text-[8px] md:text-[8px] leading-normal text-red-800 ">
            {submitError}
          </p>
        </div>
      )}

      {/* Feedback Form Container - White Card */}
      <div className="min-h-[268px] w-full sm:w-full md:max-w-[595px] lg:w-[595px] overflow-hidden rounded-[10px] bg-[#fbfbfb] p-3 sm:p-4 md:p-[15px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]">
        <form onSubmit={handleFeedbackSubmit}>
          {/* Rating Section */}
          <div className="mb-5 sm:mb-6 md:mb-[22px]">
            <label className="mb-2 sm:mb-3 md:mb-[10px] block text-xs sm:text-sm md:text-[13px] font-medium leading-none text-[#0d1b2a] ">
              How would you rate your overall experience?
            </label>
            <div className="flex gap-2 sm:gap-2.5 md:gap-[8px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-[23px] md:w-[23px] transition-colors hover:opacity-80"
                >
                  <Star
                    className={`h-5 w-5 sm:h-6 sm:w-6 md:h-[23px] md:w-[23px] ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-4 sm:mb-5 md:mb-[16px]">
            <label className="mb-1.5 sm:mb-2 md:mb-[6px] block text-xs sm:text-sm md:text-[13px] font-medium leading-none text-[#0d1b2a] ">
              Comments (Optional)
            </label>
            <textarea
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              placeholder="Tell u what you love about Zeerostock or what we could improve "
              className="h-16 sm:h-20 md:h-[75px] w-full resize-none rounded-[5px] border border-[#bebebe] bg-white p-2 sm:p-2.5 md:p-[8px] text-[7px] sm:text-[8px] md:text-[8px] leading-[12px] tracking-[0.375px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] "
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-8 sm:h-9 md:h-[30px] w-32 sm:w-40 md:w-[160px] items-center justify-center rounded-[8px] bg-[#1e3a8a] text-[7px] sm:text-[8px] md:text-[10px] font-semibold leading-[11px] text-white transition-colors hover:bg-[#1e3a8a]/90 disabled:cursor-not-allowed disabled:opacity-50 "
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

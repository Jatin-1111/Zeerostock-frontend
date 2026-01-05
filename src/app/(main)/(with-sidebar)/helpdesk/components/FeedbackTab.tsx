"use client";

import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { authService } from "@/services/auth.service";

export default function FeedbackTab() {
  const [rating, setRating] = useState(0);
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setSubmitError(
            "Your session has expired. Please log out and log back in."
          );
        } else {
          setSubmitError(
            data.message || "Failed to submit feedback. Please try again."
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
    <div className="w-full">
      {/* Title Section */}
      <div className="mb-6">
        <h2 className="mb-[6px] text-[22.5px] font-semibold leading-none text-[#0d1b2a] ">
          Share Your Feedback
        </h2>
        <p className="text-[16.5px] font-medium leading-none text-[#9c9c9c] ">
          Help us improve your experience on Zeerostock
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-[18px] flex items-center gap-[9px] rounded-[7.5px] border border-green-200 bg-green-50 p-[11.25px]">
          <CheckCircle className="h-[18px] w-[18px] text-green-600" />
          <p className="text-[12px] leading-normal text-green-800 ">
            Thank you for your feedback! We appreciate your input.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-[18px] rounded-[7.5px] border border-red-200 bg-red-50 p-[11.25px]">
          <p className="text-[12px] leading-normal text-red-800 ">
            {submitError}
          </p>
        </div>
      )}

      {/* Feedback Form Container - White Card */}
      <div className="min-h-[401.25px] w-[893.25px] overflow-hidden rounded-[15px] bg-[#fbfbfb] p-[22.5px] shadow-[0px_0px_4.5px_0px_rgba(24,181,34,0.25)]">
        <form onSubmit={handleFeedbackSubmit}>
          {/* Rating Section */}
          <div className="mb-[33px]">
            <label className="mb-[15px] block text-[19.5px] font-medium leading-none text-[#0d1b2a] ">
              How would you rate your overall experience?
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="h-[33.75px] w-[33.75px] transition-colors hover:opacity-80"
                >
                  <Star
                    className={`h-[33.75px] w-[33.75px] ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <label className="mb-[9px] block text-[19.5px] font-medium leading-none text-[#0d1b2a] ">
              Comments (Optional)
            </label>
            <textarea
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              placeholder="Tell u what you love about Zeerostock or what we could improve "
              className="h-[112.5px] w-full resize-none rounded-[7.5px] border border-[#bebebe] bg-white p-[12px] text-[12px] leading-[18px] tracking-[0.375px] text-[#0d1b2a] placeholder:text-[#9c9c9c] focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a] "
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-[45px] w-[240px] items-center justify-center rounded-[11.25px] bg-[#1e3a8a] text-[15px] font-semibold leading-[16.5px] text-white transition-colors hover:bg-[#1e3a8a]/90 disabled:cursor-not-allowed disabled:opacity-50 "
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

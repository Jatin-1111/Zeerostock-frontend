"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  Bug,
  CheckCircle,
  Clock,
  ChevronDown,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-panel";

interface Feedback {
  id: number;
  user_id: number;
  full_name: string;
  email: string;
  rating: number;
  comments: string;
  created_at: string;
}

interface BugReport {
  id: number;
  user_id: number;
  full_name: string;
  email: string;
  title: string;
  category: string;
  severity: string;
  description: string;
  steps_to_reproduce: string;
  status: string;
  created_at: string;
  resolved_at: string;
}

interface RatingDistribution {
  rating: number;
  count: number;
}

interface FeedbackStats {
  ratingDistribution: RatingDistribution[];
  totalFeedback: number;
  averageRating: number;
}

interface BugStats {
  statusDistribution: { status: string; count: number }[];
  severityDistribution: { severity: string; count: number }[];
  totalBugs: number;
  pendingBugs: number;
  resolvedBugs: number;
}

export default function FeedbackBugsPage() {
  const [activeTab, setActiveTab] = useState<"feedback" | "bugs">("feedback");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [bugList, setBugList] = useState<BugReport[]>([]);
  const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | null>(
    null
  );
  const [bugStats, setBugStats] = useState<BugStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackRatingFilter, setFeedbackRatingFilter] = useState("");
  const [bugSearch, setBugSearch] = useState("");
  const [bugStatusFilter, setBugStatusFilter] = useState("");
  const [bugSeverityFilter, setBugSeverityFilter] = useState("");
  const [bugCategoryFilter, setBugCategoryFilter] = useState("");

  // Pagination
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [bugPage, setBugPage] = useState(1);
  const [feedbackTotal, setFeedbackTotal] = useState(0);
  const [bugTotal, setBugTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    if (activeTab === "feedback") {
      fetchFeedback();
      fetchFeedbackStats();
    } else {
      fetchBugs();
      fetchBugStats();
    }
  }, [
    activeTab,
    feedbackPage,
    feedbackSearch,
    feedbackRatingFilter,
    bugPage,
    bugSearch,
    bugStatusFilter,
    bugSeverityFilter,
    bugCategoryFilter,
  ]);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams({
        page: feedbackPage.toString(),
        limit: limit.toString(),
        ...(feedbackSearch && { search: feedbackSearch }),
        ...(feedbackRatingFilter && { rating: feedbackRatingFilter }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback/all?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackList(data.feedback);
        setFeedbackTotal(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbackStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackStats(data);
      }
    } catch (error) {
      console.error("Error fetching feedback stats:", error);
    }
  };

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams({
        page: bugPage.toString(),
        limit: limit.toString(),
        ...(bugSearch && { search: bugSearch }),
        ...(bugStatusFilter && { status: bugStatusFilter }),
        ...(bugSeverityFilter && { severity: bugSeverityFilter }),
        ...(bugCategoryFilter && { category: bugCategoryFilter }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bugs/all?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBugList(data.bugReports);
        setBugTotal(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching bugs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBugStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bugs/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBugStats(data);
      }
    } catch (error) {
      console.error("Error fetching bug stats:", error);
    }
  };

  const handleBugStatusUpdate = async (bugId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bugs/${bugId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        fetchBugs();
        fetchBugStats();
      }
    } catch (error) {
      console.error("Error updating bug status:", error);
    }
  };

  const deleteFeedback = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchFeedback();
        fetchFeedbackStats();
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const deleteBug = async (id: number) => {
    if (!confirm("Are you sure you want to delete this bug report?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bugs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchBugs();
        fetchBugStats();
      }
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "resolved"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Feedback & Bug Reports
          </h1>
          <p className="text-sm text-gray-600">
            Manage user feedback and bug reports
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("feedback")}
              className={`pb-4 pt-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "feedback"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Feedback</span>
                {feedbackStats && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    {feedbackStats.totalFeedback}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab("bugs")}
              className={`pb-4 pt-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "bugs"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                <span>Bug Reports</span>
                {bugStats && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    {bugStats.totalBugs}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <>
              {/* Statistics */}
              {feedbackStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Total Feedback
                      </h3>
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">
                      {feedbackStats.totalFeedback}
                    </p>
                  </div>

                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Average Rating
                      </h3>
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">
                      {feedbackStats.averageRating.toFixed(1)}
                    </p>
                  </div>

                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-600 mb-4">
                      Rating Distribution
                    </h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const data = feedbackStats.ratingDistribution.find(
                          (r) => r.rating === rating
                        );
                        const count = data?.count || 0;
                        const percentage =
                          feedbackStats.totalFeedback > 0
                            ? (count / feedbackStats.totalFeedback) * 100
                            : 0;

                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 w-8">
                              {rating}★
                            </span>
                            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 w-8">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name, email, or comments..."
                        value={feedbackSearch}
                        onChange={(e) => {
                          setFeedbackSearch(e.target.value);
                          setFeedbackPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Rating
                    </label>
                    <select
                      value={feedbackRatingFilter}
                      onChange={(e) => {
                        setFeedbackRatingFilter(e.target.value);
                        setFeedbackPage(1);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <option value="">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
                    <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading feedback...</p>
                  </div>
                ) : feedbackList.length === 0 ? (
                  <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">No feedback found</p>
                  </div>
                ) : (
                  feedbackList.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white p-6 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {feedback.full_name}
                            </h3>
                            {renderRatingStars(feedback.rating)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {feedback.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(feedback.created_at).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteFeedback(feedback.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete feedback"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {feedback.comments && (
                        <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded">
                          {feedback.comments}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {feedbackTotal > limit && (
                <div className="mt-6 flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Showing {(feedbackPage - 1) * limit + 1} to{" "}
                    {Math.min(feedbackPage * limit, feedbackTotal)} of{" "}
                    {feedbackTotal} results
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeedbackPage((p) => Math.max(1, p - 1))}
                      disabled={feedbackPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setFeedbackPage((p) => p + 1)}
                      disabled={feedbackPage * limit >= feedbackTotal}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Bugs Tab */}
          {activeTab === "bugs" && (
            <>
              {/* Statistics */}
              {bugStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Total Bugs
                      </h3>
                      <Bug className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">
                      {bugStats.totalBugs}
                    </p>
                  </div>

                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Pending
                      </h3>
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">
                      {bugStats.pendingBugs}
                    </p>
                  </div>

                  <div className="bg-white p-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Resolved
                      </h3>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-semibold text-gray-900">
                      {bugStats.resolvedBugs}
                    </p>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search bugs..."
                        value={bugSearch}
                        onChange={(e) => {
                          setBugSearch(e.target.value);
                          setBugPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={bugStatusFilter}
                      onChange={(e) => {
                        setBugStatusFilter(e.target.value);
                        setBugPage(1);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity
                    </label>
                    <select
                      value={bugSeverityFilter}
                      onChange={(e) => {
                        setBugSeverityFilter(e.target.value);
                        setBugPage(1);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <option value="">All Severity</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={bugCategoryFilter}
                      onChange={(e) => {
                        setBugCategoryFilter(e.target.value);
                        setBugPage(1);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <option value="">All Categories</option>
                      <option value="User Interface">User Interface</option>
                      <option value="Search & Filtering">
                        Search & Filtering
                      </option>
                      <option value="Payments">Payments</option>
                      <option value="Messaging">Messaging</option>
                      <option value="Notifications">Notifications</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bug List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
                    <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading bugs...</p>
                  </div>
                ) : bugList.length === 0 ? (
                  <div className="bg-white p-8 border border-gray-200 rounded-lg text-center">
                    <Bug className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">No bugs found</p>
                  </div>
                ) : (
                  bugList.map((bug) => (
                    <div
                      key={bug.id}
                      className="bg-white p-6 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">
                              {bug.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(
                                bug.severity
                              )}`}
                            >
                              {bug.severity.toUpperCase()}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(
                                bug.status
                              )}`}
                            >
                              {bug.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Reported by: {bug.full_name} ({bug.email})
                          </p>
                          <p className="text-xs text-gray-500">
                            Category: {bug.category} •{" "}
                            {new Date(bug.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {bug.status === "pending" && (
                            <button
                              onClick={() =>
                                handleBugStatusUpdate(bug.id, "resolved")
                              }
                              className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Mark Resolved
                            </button>
                          )}
                          {bug.status === "resolved" && (
                            <button
                              onClick={() =>
                                handleBugStatusUpdate(bug.id, "pending")
                              }
                              className="px-3 py-1.5 bg-yellow-600 text-white text-xs font-medium rounded hover:bg-yellow-700 transition-colors flex items-center gap-1"
                            >
                              <Clock className="w-3 h-3" />
                              Reopen
                            </button>
                          )}
                          <button
                            onClick={() => deleteBug(bug.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete bug"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">
                            Description:
                          </h4>
                          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                            {bug.description}
                          </p>
                        </div>

                        {bug.steps_to_reproduce && (
                          <div>
                            <h4 className="text-xs font-medium text-gray-700 mb-1">
                              Steps to Reproduce:
                            </h4>
                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-line">
                              {bug.steps_to_reproduce}
                            </p>
                          </div>
                        )}

                        {bug.resolved_at && (
                          <p className="text-xs text-green-600">
                            Resolved on:{" "}
                            {new Date(bug.resolved_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {bugTotal > limit && (
                <div className="mt-6 flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Showing {(bugPage - 1) * limit + 1} to{" "}
                    {Math.min(bugPage * limit, bugTotal)} of {bugTotal} results
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBugPage((p) => Math.max(1, p - 1))}
                      disabled={bugPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setBugPage((p) => p + 1)}
                      disabled={bugPage * limit >= bugTotal}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

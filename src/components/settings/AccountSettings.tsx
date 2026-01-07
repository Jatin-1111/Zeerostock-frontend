"use client";

import React, { useState, useEffect, useCallback } from "react";
import { User, MapPin, Save, Building2, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { roleService } from "@/services/role.service";
import {
  getSupplierSettings,
  updateSupplierBusinessInfo,
} from "@/services/supplier-settings.service";
import {
  getUserSettings,
  updateUserAccountInfo,
} from "@/services/user-settings.service";
import type { AccountInfo } from "@/types/buyer.types";
import { toast } from "sonner";

export default function AccountSettings() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState<AccountInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    gstNumber: "",
    bio: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [businessData, setBusinessData] = useState({
    businessLegalName: "",
    businessRegistrationNumber: "",
    gstNumber: "",
    businessType: "Limited Liability Company",
    yearEstablished: "",
  });
  const [kycProgress, setKycProgress] = useState({
    percentage: 80,
    completedSections: 4,
    totalSections: 5,
    status: "In Progress" as "In Progress" | "Completed" | "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [switchingRole, setSwitchingRole] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Determine available roles
  const hasMultipleRoles = user?.roles && user.roles.length > 1;
  const hasBuyerRole = user?.roles?.includes("buyer");
  const hasSupplierRole = user?.roles?.includes("supplier");
  const currentRole = user?.activeRole;
  const activeRole = user?.activeRole || "buyer";

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("[AccountSettings] Loading with activeRole:", activeRole);

      // Use role-based service
      const response = await getUserSettings(activeRole);

      if (response.success && response.data) {
        // Ensure all required fields have default values
        setFormData({
          firstName: response.data.account.firstName || "",
          lastName: response.data.account.lastName || "",
          email: response.data.account.email || "",
          phone: response.data.account.phone || "",
          companyName: response.data.account.companyName || "",
          gstNumber: "",
          bio: response.data.account.bio || "",
          street: response.data.account.street || "",
          city: response.data.account.city || "",
          state: response.data.account.state || "",
          zip: response.data.account.zip || "",
        });

        // Load additional supplier data if user is a supplier
        if (currentRole === "supplier" || (hasSupplierRole && !hasBuyerRole)) {
          const supplierResponse = await getSupplierSettings();
          if (supplierResponse.success && supplierResponse.data) {
            if (supplierResponse.data.business) {
              setBusinessData({
                businessLegalName:
                  supplierResponse.data.business.businessLegalName || "",
                businessRegistrationNumber:
                  supplierResponse.data.business.businessRegistrationNumber ||
                  "",
                gstNumber: supplierResponse.data.business.gstNumber || "",
                businessType:
                  supplierResponse.data.business.businessType ||
                  "Limited Liability Company",
                yearEstablished:
                  supplierResponse.data.business.yearEstablished || "",
              });
            }
            if (supplierResponse.data.verificationStatus) {
              const status = supplierResponse.data.verificationStatus.status;
              setKycProgress({
                ...supplierResponse.data.verificationStatus,
                status: (status === "Completed" || status === "Pending"
                  ? status
                  : "In Progress") as "In Progress" | "Completed" | "Pending",
              });
            }
          }
        }
      } else {
        throw new Error(response.message || "Failed to load settings");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      const message =
        err instanceof Error ? err.message : "Failed to load settings";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [activeRole, currentRole, hasSupplierRole, hasBuyerRole]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Use role-based update
      const response = await updateUserAccountInfo(formData, activeRole);

      if (response.success) {
        setSuccess("Account information updated successfully");
        toast.success("Account information updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update account:", err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to update account information";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBusinessInfo = async () => {
    if (currentRole !== "supplier") return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateSupplierBusinessInfo(businessData);

      if (response.success) {
        setSuccess("Business information updated successfully");
        toast.success("Business information updated successfully");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update business info:", err);
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to update business information";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleRoleSwitch = async (newRole: "buyer" | "supplier") => {
    // Prevent switching to same role
    if (newRole === currentRole) {
      toast.info(`You are already in ${newRole} mode`);
      return;
    }

    // Validate user has the target role
    const userRoles = user?.roles || [];
    if (!userRoles.includes(newRole)) {
      toast.error(
        `You don't have ${newRole} access. Please contact support to get ${newRole} role.`
      );
      return;
    }

    setSwitchingRole(true);
    try {
      console.log(`[RoleSwitch] Switching from ${currentRole} to ${newRole}`);
      const response = await roleService.switchRole(newRole);

      if (response.success) {
        toast.success(`Switched to ${newRole} mode successfully`);

        // Refresh user data to update the active role in context
        await refreshUser();

        // Redirect to appropriate dashboard based on new role
        const dashboardPath = `/${newRole}/dashboard`;
        console.log(`[RoleSwitch] Redirecting to ${dashboardPath}`);

        // Use router.push for client-side navigation
        router.push(dashboardPath);
      } else {
        throw new Error(response.message || "Failed to switch role");
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to switch role";
      toast.error(errorMessage);
    } finally {
      setSwitchingRole(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16.875px]">
      {/* Header Section - scaled by 0.75 */}
      <div>
        <h1 className="text-[39.75px] font-semibold text-[#0d1b2a] mb-[4.5px] leading-[1.2]">
          Account Settings
        </h1>
        <p className="text-[18px] text-[#0d1b2a] font-normal">
          Manage your personal information and account details
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-[#f0fdf4] border border-[#86efac] text-[#166534] px-[9px] py-[6.75px] rounded-[4.5px]">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] px-[9px] py-[6.75px] rounded-[4.5px]">
          {error}
        </div>
      )}

      {/* Select Profile Section - Only show if user has multiple roles */}
      {hasMultipleRoles && (
        <div className="bg-white rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[13.5px] relative">
          {/* Section Header */}
          <div className="flex items-center gap-[11.25px] mb-[22.5px]">
            <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
              Select Profile
            </h2>
          </div>

          {/* Divider Line */}
          <div className="absolute left-0 top-[50.625px] w-full h-[0.75px] bg-[#e5e7eb]" />

          {/* Role Buttons */}
          <div className="flex gap-[16.875px] mt-[16.875px]">
            {/* Buyer Button */}
            {hasBuyerRole && (
              <button
                onClick={() => handleRoleSwitch("buyer")}
                disabled={switchingRole || currentRole === "buyer"}
                className={`flex-1 h-[48.75px] px-[7.5px] py-[11.25px] rounded-[9px] text-[15px] font-semibold transition-all ${
                  currentRole === "buyer"
                    ? "bg-[#eeffef] border border-[#2aae7a] text-[#2aae7a] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.25)]"
                    : "border border-[#9c9c9c] text-[#9c9c9c] hover:border-[#2aae7a] hover:text-[#2aae7a]"
                }`}
              >
                {switchingRole && currentRole !== "buyer"
                  ? "Switching..."
                  : "Buyer"}
              </button>
            )}

            {/* Supplier Button */}
            {hasSupplierRole && (
              <button
                onClick={() => handleRoleSwitch("supplier")}
                disabled={switchingRole || currentRole === "supplier"}
                className={`flex-1 h-[48.75px] px-[7.5px] py-[11.25px] rounded-[9px] text-[15px] font-semibold transition-all ${
                  currentRole === "supplier"
                    ? "bg-[#eeffef] border border-[#2aae7a] text-[#2aae7a] shadow-[0px_0px_7.5px_0px_rgba(24,181,34,0.25)]"
                    : "border border-[#9c9c9c] text-[#9c9c9c] hover:border-[#2aae7a] hover:text-[#2aae7a]"
                }`}
              >
                {switchingRole && currentRole !== "supplier"
                  ? "Switching..."
                  : "Supplier"}
              </button>
            )}
          </div>

          {/* Helper Text */}
          <p className="text-[15px] text-[#9c9c9c] text-center mt-[13.5px]">
            Switch between your buyer and supplier profile instantly
          </p>
        </div>
      )}

      {/* Personal Information Section - scaled by 0.75 */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[13.5px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[11.25px] mb-[22.5px]">
          <User className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Personal Information
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[50.625px] w-full h-[0.75px] bg-[#e5e7eb]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-[16.875px] mt-[16.875px]">
          {/* First Row: First Name and Last Name */}
          <div className="grid grid-cols-2 gap-[16.875px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
          </div>

          {/* Second Row: Email and Phone */}
          <div className="grid grid-cols-2 gap-[16.875px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Information Section - scaled by 0.75 */}
      <div className="bg-white rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[13.5px] relative">
        {/* Section Header */}
        <div className="flex items-center gap-[11.25px] mb-[22.5px]">
          <MapPin className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
            Address Information
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-0 top-[50.625px] w-full h-[0.75px] bg-[#e5e7eb]" />

        {/* Form Fields */}
        <div className="flex flex-col gap-[16.875px] mt-[16.875px]">
          {/* Street Address */}
          <div>
            <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
              Street Address
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-[1fr_1fr_0.84fr] gap-[16.875px]">
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
              />
            </div>
          </div>

          {/* Bio / Company Description */}
          <div>
            <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
              Bio / Company Description
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full h-[150.75px] p-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none resize-none focus:border-[#2aae7a] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Business and KYC Section - Only show for suppliers */}
      {currentRole === "supplier" && (
        <div className="bg-white rounded-[15px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] p-[13.5px] relative">
          {/* Section Header */}
          <div className="flex items-center gap-[11.25px] mb-[22.5px]">
            <Building2 className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
            <h2 className="text-[18px] font-semibold text-[#0d1b2a]">
              Business and KYC
            </h2>
          </div>

          {/* Divider Line */}
          <div className="absolute left-0 top-[50.625px] w-full h-[0.75px] bg-[#e5e7eb]" />

          {/* KYC Verification Progress */}
          <div className="mt-[16.875px] mb-[16.875px] p-[15px] bg-[#f9fafb] rounded-[12px]">
            <div className="flex items-start justify-between mb-[11.25px]">
              <div>
                <h3 className="text-[16.5px] font-semibold text-[#0d1b2a] mb-[7.5px]">
                  KYC Verification Progress
                </h3>
                <p className="text-[12px] text-[#6b7280]">
                  {kycProgress.percentage}% Complete -{" "}
                  {kycProgress.completedSections} of {kycProgress.totalSections}{" "}
                  sections verified
                </p>
              </div>
              <div className="flex items-center gap-[9px] px-[15px] py-[6px] bg-[#fff7ed] border border-[#fb923c] rounded-[6px]">
                <Clock className="w-[13.5px] h-[13.5px] text-[#ea580c]" />
                <span className="text-[12px] font-medium text-[#ea580c]">
                  {kycProgress.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-[7.5px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#2aae7a] rounded-full transition-all duration-300"
                style={{ width: `${kycProgress.percentage}%` }}
              />
            </div>

            {/* Percentage Text */}
            <div className="flex justify-end mt-[6px]">
              <span className="text-[18px] font-bold text-[#0d1b2a]">
                {kycProgress.percentage}%
              </span>
            </div>
          </div>

          {/* Business Form Fields */}
          <div className="flex flex-col gap-[16.875px]">
            {/* First Row: Business Legal Name and Business Registration Number */}
            <div className="grid grid-cols-2 gap-[16.875px]">
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                  Business Legal Name
                </label>
                <input
                  type="text"
                  value={businessData.businessLegalName}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      businessLegalName: e.target.value,
                    })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  value={businessData.businessRegistrationNumber}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      businessRegistrationNumber: e.target.value,
                    })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
                />
              </div>
            </div>

            {/* Second Row: GST Number, Business Type, and Year Established */}
            <div className="grid grid-cols-[1fr_1fr_0.7fr] gap-[16.875px]">
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                  GST Number
                </label>
                <input
                  type="text"
                  value={businessData.gstNumber}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      gstNumber: e.target.value,
                    })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                  Business Type
                </label>
                <select
                  value={businessData.businessType}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      businessType: e.target.value,
                    })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d1b2a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="Limited Liability Company">
                    Limited Liability Company
                  </option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole Proprietorship">
                    Sole Proprietorship
                  </option>
                  <option value="Public Limited">Public Limited</option>
                </select>
              </div>
              <div>
                <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[7.875px]">
                  Year Established
                </label>
                <select
                  value={businessData.yearEstablished}
                  onChange={(e) =>
                    setBusinessData({
                      ...businessData,
                      yearEstablished: e.target.value,
                    })
                  }
                  className="w-full h-[42px] px-[12px] border border-[#bebebe] rounded-[7.5px] text-[12px] text-[#0d1b2a] outline-none focus:border-[#2aae7a] transition-colors appearance-none bg-white cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%230d1b2a' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 50 }, (_, i) => 2025 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Save Business Info Button - Only for supplier business data */}
          <div className="flex justify-end mt-[16.875px]">
            <button
              onClick={handleSaveBusinessInfo}
              disabled={saving}
              className="flex items-center gap-[5.625px] py-[8.4375px] px-[61.875px] bg-[#2aae7a] text-white rounded-[6.75px] text-[11.25px] font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
            >
              <Save className="w-[15.75px] h-[15.75px] text-white" />
              {saving ? "Saving..." : "Save Business Info"}
            </button>
          </div>
        </div>
      )}

      {/* Save Button - scaled by 0.75 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-[5.625px] py-[8.4375px] px-[61.875px] bg-[#1e3a8a] text-white rounded-[6.75px] text-[11.25px] font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-opacity"
        >
          <Save className="w-[15.75px] h-[15.75px] text-white" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

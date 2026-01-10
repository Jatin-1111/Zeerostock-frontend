"use client";

import { useState } from "react";
import { ShieldCheck, Info, Lock, Save, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SecuritySettings() {
  const router = useRouter();
  const [security, setSecurityData] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30 minutes",
  });

  const toggleSecurity = (key: keyof typeof security) => {
    if (typeof security[key] === "boolean") {
      setSecurityData({
        ...security,
        [key]: !security[key],
      });
    }
  };

  const handleChangePassword = () => {
    router.push("/admin-panel/change-password");
  };

  const handleSaveChanges = () => {
    toast.success("Security settings have been updated successfully");
  };

  // Helper component for Toggle Switch
  const ToggleSwitch = ({
    checked,
    onClick,
  }: {
    checked: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative w-[28.69px] h-[17.44px] rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#2aae7a]" : "bg-[rgba(120,120,128,0.16)]"
      }`}
    >
      <div
        className={`absolute w-[15.19px] h-[15.19px] bg-white rounded-full top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_0.56px_rgba(0,0,0,0.04),0px_1.69px_4.5px_0px_rgba(0,0,0,0.15),0px_1.69px_0.56px_0px_rgba(0,0,0,0.06)] transition-all duration-200 ${
          checked ? "right-[1.13px]" : "left-[1.13px]"
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col gap-[23.63px] w-full">
      {/* Title Section */}
      <div>
        <h1 className="text-[19.69px] font-semibold text-[#0d1b2a] mb-[4.5px] leading-normal">
          Security
        </h1>
        <p className="text-[9.56px] text-[#9c9c9c] leading-normal font-normal">
          Manage your account security settings
        </p>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white rounded-[11.25px] shadow-[0px_1.13px_3.38px_0px_rgba(0,0,0,0.25)] overflow-hidden w-full">
        {/* Card Header */}
        <div className="flex items-center gap-[11.25px] p-[11.25px_14.06px]">
          <ShieldCheck className="w-[14.63px] h-[14.63px] text-[#0d1b2a]" />
          <h2 className="text-[13.5px] font-semibold text-[#0d1b2a] leading-normal">
            Security Settings
          </h2>
        </div>

        {/* Divider Line */}
        <div className="h-[0.56px] bg-[#e5e7eb] w-full" />

        {/* Content */}
        <div className="p-[19.69px]">
          {/* Authentication Section */}
          <div className="mb-[28.13px]">
            <h3 className="text-[11.25px] font-medium text-[#0d1b2a] mb-[19.69px] leading-normal">
              Authentication
            </h3>

            {/* Two-Factor Authentication Toggle */}
            <div className="flex items-center justify-between mb-[19.69px]">
              <div>
                <div className="text-[9.56px] font-medium text-[#0d1b2a] mb-[4.5px] leading-normal">
                  Two-Factor Authentication
                </div>
                <div className="text-[8.44px] text-[#747474] font-normal leading-normal">
                  Add an extra layer of security to your account
                </div>
              </div>
              <ToggleSwitch
                checked={security.twoFactor as boolean}
                onClick={() => toggleSecurity("twoFactor")}
              />
            </div>

            {/* Session Timeout Input */}
            <div>
              <label className="block text-[9.56px] font-medium text-[#0d1b2a] mb-[7.88px] leading-normal">
                Session Timeout
              </label>
              <div className="relative w-[182.25px]">
                <input
                  type="text"
                  value={security.sessionTimeout as string}
                  onChange={(e) =>
                    setSecurityData({
                      ...security,
                      sessionTimeout: e.target.value,
                    })
                  }
                  className="w-full h-[29.25px] px-[9px] text-[9px] text-[#9c9c9c] border border-[#bebebe] rounded-[5.63px] outline-none"
                />
                <ChevronDown className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[13.5px] h-[13.5px] text-[#0d1b2a] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Security Alerts Section */}
          <div className="mb-[28.13px]">
            <h3 className="text-[11.25px] font-medium text-[#0d1b2a] mb-[19.69px] leading-normal">
              Security Alerts
            </h3>

            {/* Login Alerts Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9.56px] font-medium text-[#0d1b2a] mb-[4.5px] leading-normal">
                  Login Alerts
                </div>
                <div className="text-[8.44px] text-[#747474] font-normal leading-normal">
                  Get notified on new login attempts
                </div>
              </div>
              <ToggleSwitch
                checked={security.loginAlerts as boolean}
                onClick={() => toggleSecurity("loginAlerts")}
              />
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h3 className="text-[11.25px] font-medium text-[#0d1b2a] mb-[19.69px] leading-normal">
              Password
            </h3>
            <button
              onClick={handleChangePassword}
              className="flex items-center justify-center gap-[5.63px] bg-[#2aae7a] text-white border-none rounded-[6.75px] py-[8.44px] px-[45px] cursor-pointer text-[11.25px] font-semibold hover:bg-[#239668] transition-colors"
            >
              <Lock className="w-[15.19px] h-[15.19px]" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Account Secure Notice */}
      <div className="bg-[#c0daff] rounded-[11.25px] p-[11.25px] flex items-center gap-[9px] w-full">
        <Info className="w-[12.38px] h-[12.38px] flex-shrink-0 text-[#085396]" />
        <p className="text-[10.13px] leading-[16.88px] text-[#085396] m-0 font-normal">
          Your Account is secure. Last login was today at 2:30 PM from Atlanta,
          GA.
        </p>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          className="flex items-center justify-center gap-[5.63px] bg-[#1e3a8a] text-white border-none rounded-[6.75px] py-[8.44px] px-[61.88px] cursor-pointer text-[11.25px] font-semibold hover:opacity-90 transition-opacity"
        >
          <Save className="w-[15.75px] h-[15.75px]" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

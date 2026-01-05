"use client";

import { useState } from "react";
import { ShieldCheck, Info, Lock, Save, ChevronDown } from "lucide-react";

export default function SecuritySettings() {
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
      className={`relative w-[38.25px] h-[23.25px] rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-[#2aae7a]" : "bg-[rgba(120,120,128,0.16)]"
      }`}
    >
      <div
        className={`absolute w-[20.25px] h-[20.25px] bg-white rounded-full top-1/2 -translate-y-1/2 shadow-[0px_0px_0px_0.75px_rgba(0,0,0,0.04),0px_2.25px_6px_0px_rgba(0,0,0,0.15),0px_2.25px_0.75px_0px_rgba(0,0,0,0.06)] transition-all duration-200 ${
          checked ? "right-[1.5px]" : "left-[1.5px]"
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col gap-[31.5px] w-full">
      {/* Title Section */}
      <div>
        <h1 className="text-[26.25px] font-semibold text-[#0d1b2a] mb-[6px] leading-normal">
          Security
        </h1>
        <p className="text-[12.75px] text-[#9c9c9c] leading-normal font-normal">
          Manage your account security settings
        </p>
      </div>

      {/* Security Settings Card */}
      <div className="bg-white rounded-[15px] shadow-[0px_1.5px_4.5px_0px_rgba(0,0,0,0.25)] overflow-hidden w-full">
        {/* Card Header */}
        <div className="flex items-center gap-[15px] p-[15px_18.75px]">
          <ShieldCheck className="w-[19.5px] h-[19.5px] text-[#0d1b2a]" />
          <h2 className="text-[18px] font-semibold text-[#0d1b2a] leading-normal">
            Security Settings
          </h2>
        </div>

        {/* Divider Line */}
        <div className="h-[0.75px] bg-[#e5e7eb] w-full" />

        {/* Content */}
        <div className="p-[26.25px]">
          {/* Authentication Section */}
          <div className="mb-[37.5px]">
            <h3 className="text-[15px] font-medium text-[#0d1b2a] mb-[26.25px] leading-normal">
              Authentication
            </h3>

            {/* Two-Factor Authentication Toggle */}
            <div className="flex items-center justify-between mb-[26.25px]">
              <div>
                <div className="text-[12.75px] font-medium text-[#0d1b2a] mb-[6px] leading-normal">
                  Two-Factor Authentication
                </div>
                <div className="text-[11.25px] text-[#747474] font-normal leading-normal">
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
              <label className="block text-[12.75px] font-medium text-[#0d1b2a] mb-[10.5px] leading-normal">
                Session Timeout
              </label>
              <div className="relative w-[243px]">
                <input
                  type="text"
                  value={security.sessionTimeout as string}
                  onChange={(e) =>
                    setSecurityData({
                      ...security,
                      sessionTimeout: e.target.value,
                    })
                  }
                  className="w-full h-[39px] px-[12px] text-[12px] text-[#9c9c9c] border border-[#bebebe] rounded-[7.5px] outline-none"
                />
                <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#0d1b2a] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Security Alerts Section */}
          <div className="mb-[37.5px]">
            <h3 className="text-[15px] font-medium text-[#0d1b2a] mb-[26.25px] leading-normal">
              Security Alerts
            </h3>

            {/* Login Alerts Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[12.75px] font-medium text-[#0d1b2a] mb-[6px] leading-normal">
                  Login Alerts
                </div>
                <div className="text-[11.25px] text-[#747474] font-normal leading-normal">
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
            <h3 className="text-[15px] font-medium text-[#0d1b2a] mb-[26.25px] leading-normal">
              Password
            </h3>
            <button className="flex items-center justify-center gap-[7.5px] bg-[#2aae7a] text-white border-none rounded-[9px] py-[11.25px] px-[60px] cursor-pointer text-[15px] font-semibold hover:bg-[#239668] transition-colors">
              <Lock className="w-[20.25px] h-[20.25px]" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Account Secure Notice */}
      <div className="bg-[#c0daff] rounded-[15px] p-[15px] flex items-center gap-[12px] w-full">
        <Info className="w-[16.5px] h-[16.5px] flex-shrink-0 text-[#085396]" />
        <p className="text-[13.5px] leading-[22.5px] text-[#085396] m-0 font-normal">
          Your Account is secure. Last login was today at 2:30 PM from Atlanta,
          GA.
        </p>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button className="flex items-center justify-center gap-[7.5px] bg-[#1e3a8a] text-white border-none rounded-[9px] py-[11.25px] px-[82.5px] cursor-pointer text-[15px] font-semibold hover:opacity-90 transition-opacity">
          <Save className="w-[21px] h-[21px]" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

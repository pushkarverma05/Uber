"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log("User:", result.user);
      router.push("/home"); // Redirect to main app
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full text-white max-w-sm p-6">
        <h2 className="text-2xl font-semibold text-center mb-2">Welcome back</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 4-digit code sent via SMS to {phone}
        </p>
        <form onSubmit={verifyOtp} className="flex flex-col gap-4">
          <input
            type="text"
            maxLength={6}
            className="border p-3 text-center text-lg tracking-widest rounded-lg"
            placeholder="----"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg font-medium"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Next"}
          </button>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}
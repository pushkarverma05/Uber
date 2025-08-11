"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseClient";
import Link from "next/link";

export default function UserLogin() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("Recaptcha solved"),
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setupRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${phone}`, appVerifier);
      window.confirmationResult = confirmationResult;
      router.push(`/otp?phone=${phone}`);
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();

    const newUserData = {
      email: email,
      password: password
    };

    setUserData(newUserData);
    console.log(newUserData); // log immediately with the collected data

    // Now clear the inputs
    setEmail("");
    setPassword("");

    // TODO: Add Firebase email/password signup here
  };
  return (
    <>
     <div className="min-h-screen bg-black">
        <div className="flex p-12 bg-black">
        {/* Title */}
          <h1 className="text-white text-4xl">Cab X</h1>
        </div>
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-6">
        {/* Two-column responsive layout */}
        <div className="flex flex-col items-center justify-center gap-8 w-full">
          
          {/* Phone Login */}
          <div className="rounded-lg w-full md:w-1/3 p-6 shadow-sm">
            <h2 className="text-2xl text-white font-semibold text-center mb-12">
              Login with Mobile Number
            </h2>
            <form onSubmit={sendOtp} className="flex text-white flex-col gap-4">
              <div className="flex  rounded-lg overflow-hidden">
                <span className="bg-zinc-900 px-3 py-2">🇮🇳 +91</span>
                <input
                  type="tel"
                  className="flex-1 p-2 outline-none bg-zinc-800"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-lg font-medium"
                disabled={loading}
              >
                {loading ? "Sending..." : "Continue"}
              </button>
              {message && <p className="text-red-500 text-sm">{message}</p>}
            </form>
            <div id="recaptcha-container"></div>
          </div>

          {/* Email + Password Login */}
          <div className="rounded-lg w-full md:w-1/3 p-6 shadow-sm">
            <h2 className="text-2xl text-white font-semibold text-center mb-4">
              Login with Email
            </h2>
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-zinc-500 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className=" rounded px-3 text-white bg-zinc-800 py-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-500 font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className=" rounded px-3 text-white bg-zinc-800 py-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 mb-4 rounded-lg font-medium hover:bg-blue-700"
              >
                Login
              </button>
            </form>
            <p className="text-white font-light">New Here?<Link href='/usersignup' className="ml-2 text-blue-500 font-light">Create an Account</Link></p>
          </div>

        </div>
      </div>
      <div className="flex w-full md:w-1/3 flex-col gap-2 rounded-lg p-6 shadow-sm">
        <Link  href="/captainlogin" className="flex items-center justify-center bg-zinc-900 text-white py-2 px-5 rounded-lg font-medium">Sign in as Captain</Link>
      </div>
    </div>
    </div>
 </>
  );
}
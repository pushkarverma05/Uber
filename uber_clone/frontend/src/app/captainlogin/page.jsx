"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setCaptainData] = useState({});


  const handleEmailLogin = (e) => {
    e.preventDefault();

    const newcaptainData = {
      email: email,
      password: password
    };

    setCaptainData(newcaptainData);
    console.log(newcaptainData); // log immediately with the collected data

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
    <div className="flex flex-col items-center justify-center ">
      <div className="w-full pt-0 p-6">
        {/* Two-column responsive layout */}
        <div className="flex flex-col items-center justify-center gap-8 w-full">

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
            <Link href='/captainsignup' className="ml-2 text-blue-500 font-light">Create an Account</Link>
          </div>

        </div>
      </div>
      <div className="flex w-full md:w-1/3 flex-col  gap-2 rounded-lg p-6 shadow-sm">
        <Link  href="/Userlogin" className="flex items-center justify-center bg-zinc-900 text-white py-2 px-5 rounded-lg font-medium">Sign in as User</Link>
      </div>
    </div>
    </div>
    </>
  );
}
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";


export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [userData , setUserData] = useState({});
  const router = useRouter();
  const{user , setUser} = React.useContext(UserDataContext);


  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };


      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, userData);

    if(response.status === 200){
      const data = response.data
      setUser(data.user);
      localStorage.setItem("token", data.token);
      router.push("/Home");
    }
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
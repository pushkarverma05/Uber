"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useRouter } from "next/navigation";


const UserSignUp = () => {
   const [firstname, setFirstname] = useState("");
   const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
   const{ user , setUser} = React.useContext(UserDataContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUserData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    };


    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, newUserData);

    if(response.status === 201){
      const data = response.data
      setUser(data.user);
      localStorage.setItem("token", data.token);
      router.push("/Home");
    }

    // Now clear the inputs
    setFirstname('');
    setLastname('');  
    setEmail('');
    setPassword('');

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
          

          <div className="rounded-lg w-full md:w-1/2 p-6 shadow-sm">
            <h2 className="text-2xl text-white font-semibold text-center mb-4">
              Create an Account
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <h3 className=" text-lg font-medium text-white mb-2">What's your Name</h3>
              <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <label className="block text-zinc-500 font-medium mb-1">Firstname</label>
                <input
                  type="text"
                  placeholder="firstname"
                  className=" rounded px-4 text-white bg-zinc-800 py-2 w-full"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-zinc-500 font-medium mb-1">Lastname</label>
                <input
                  type="text"
                  placeholder="lastname"
                  className=" rounded px-4 text-white bg-zinc-800 py-2 w-full"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              </div>
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
                Create Account
              </button>
            </form>
            <p className="text-white font-light">Already have a account?<Link href='/Userlogin' className="ml-2 text-blue-500 font-light">Login here</Link></p>
          </div>

        </div>
      </div>
      <div className="flex w-full md:w-1/3 flex-colgap-2 rounded-lg p-6 shadow-sm">
    <p className="mx-6 text-zinc-500 text-[10px] font-extralight ">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Carx and its affiliates to the number provided.</p>
      </div>
    </div>
    </div>
 </>
  );
}

export default UserSignUp
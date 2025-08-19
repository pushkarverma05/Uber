"use client"
import React, { useRef, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "../FinishRide/page";
import LiveTracking from "@/components/LiveTracking/page";

const CaptainRiding = () => {
  const [otp, setOtp] = useState("");
  const [rideData, setRideData] = useState(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("rideId"); // ✅ get from URL query

  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (!finishRidePanelRef.current) return;

    if (finishRidePanel) {
      // Slide up
      gsap.to(finishRidePanelRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Slide down
      gsap.to(finishRidePanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [finishRidePanel]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rides/start-ride`,
        {
          rideId: rideId,   // ✅ use query param
          otp: otp
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.status === 200) {
        // Assume response.data contains ride information (adjust key if different)
        setRideData(response.data?.ride || response.data);
        setFinishRidePanel(true);
      }
    } catch (error) {
      console.error("Start ride error:", error.response?.data || error.message);
    }
  };

  return (
    <div className='h-screen  text-white flex flex-col overflow-hidden'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className="text-3xl font-semibold text-black">Cab X</h1>
        <Link href="/captainlogin" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414]'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='w-full h-1/2'>
        <LiveTracking />
      </div>
      <div className='h-1/2 w-full relative bg-[#141414]'>
        <form onSubmit={submitHandler} className="p-6">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
            className="px-6 py-2 font-light w-full border rounded-lg"
          />
          <button
            disabled={!otp}
            className="flex items-center justify-center w-full bg-[#1A1A1A] mt-5 px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
            type="submit"
          >
            Start Ride
          </button>
          <button
            type="button"
            onClick={() => router.push("/CaptainsHome")}
            className="flex items-center justify-center w-full my-4 bg-red-600 px-6 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </form>
        <div
          ref={finishRidePanelRef}
          className="fixed w-full z-10 bottom-0 translate-y-full pt-12"
        >
          {rideData && (
            <FinishRide
              rideData={rideData}
              setFinishRidePanel={setFinishRidePanel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CaptainRiding;
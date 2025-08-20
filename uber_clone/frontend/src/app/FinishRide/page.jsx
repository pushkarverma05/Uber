"use client"
import React from "react";
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css';
import axios from "axios";
import { useRouter } from "next/navigation";
import LiveTracking from "@/components/LiveTracking/page";
// Removed unused imports: useRef, useState, useGSAP, gsap

const FinishRide = (props) => {

  const router = useRouter();

  async function endRide() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rides/end-ride`,
        { rideId: props.rideData?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (response.status === 200) {
        props.setFinishRidePanel(false);
        router.push("/CaptainsHome");
      }
    } catch (error) {
      console.error("Failed to end ride", error);
    }
  }

console.log(props);
  return (
    <div className=" h-screen bg-[#141414] p-6 overflow-scroll">
      <div className="bg-[#141414] h-1/2">
      </div>
     <div 
     className="h-2/5 relative bg-[#141414] text-white p-6">
       <div className='flex items-center justify-between'>
          <div className='flex items-center just-start gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg" alt="" />
            <h4 className='text-lg font-medium'>
              {props.rideData?.user?.fullname?.firstname + " " + (props.rideData?.user?.fullname?.lastname || "")}
            </h4>
          </div>
            <h4>4.5 km</h4>
         </div>
            <div className='w-full px-4'>
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-map-pin-user-fill"></i>
                <div>
                      <h3 className='text-lg font-medium'>{props.rideData?.pickup}</h3>
                      <p className=' mb-3 text-xs'>{props.rideData?.pickup}</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-map-pin-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>{props.rideData?.destination}</h3>
                      <p className='mb-3  text-xs'>{props.rideData?.destination}</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-currency-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>₹{props.rideData?.fare}</h3>
                      <p className='text-xs'>Cash</p>
                </div>
                </div>
           </div>
         <div className='flex flex-col mt-15 items-center justify-between'>
         <button
          onClick={endRide}
           className="flex justify-center w-full bg-green-600 mb-15 px-3 py-2 rounded-lg font-semibold"
            >
  Finish Ride
</button>
         </div>

       </div>
       </div>

   )
}

export default FinishRide
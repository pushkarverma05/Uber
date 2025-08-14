"use client"
import React, { useRef, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from '@/components/FinishRide/page';
import Link from 'next/link'

const captainRiding = () => {
const [finsihRidePanel, setfinsihRidePanel] = useState(false)
const [otp, setotp] = useState('')

const finsihRidePanelRef = useRef(null);

const submitHandler= (e) =>{
  e.preventdefault()
}

    useGSAP(() => {
    gsap.to(finsihRidePanelRef.current, {
      y: finsihRidePanel ? "0%" : "100%"
    });
  }, { dependencies: [finsihRidePanel] });

  return (
      <div className='h-screen  text-white flex flex-col overflow-hidden'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className="text-3xl font-semibold text-black">Cab X</h1>
      <Link href="/captainlogin" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414]'>
        <i className="ri-logout-box-r-line"></i>
      </Link>
      </div>
        <div className='w-full h-3/5'>
          <img
            className='w-full h-full object-cover'
            src='https://pbs.twimg.com/media/DsdWxZHX4AAj0Dp.jpg:large'
            alt=''
          />
        </div>
        <div className='h-2/5 rounded-t-2xl  w-full relative bg-[#141414]'>
           <form onSubmit={(e)=>{
            submitHandler(e)
           }}
           className='p-6'
           >
            <input 
            value={otp}
            onChange={(e)=>
              setotp(e.target.value)}
            type="text" placeholder='Enter OTP'
            className="px-6 py-2 font-light w-full border rounded-lg" />
           </form>
           <div className="flex flex-col px-6 gap-5">
              <button
              onClick={()=>{
                setfinsihRidePanel(true);
              }}
              className='flex items-center justify-center w-full bg-[#1A1A1A] px-6 py-2 rounded-lg font-semibold'>Start Ride</button>
              <Link
              href='/CaptainsHome'
              className='flex items-center justify-center w-full bg-red-600 px-6 py-2 rounded-lg font-semibold'>Cancle</Link>
           </div>
        </div>
               <div
                ref={finsihRidePanelRef}
              className='fixed w-full z-10 h-full bottom-0 translate-y-full p-6 rounded-b-2xl bg-[#141414]'>
         <FinishRide />
        </div>
      </div>
  )
}

export default captainRiding
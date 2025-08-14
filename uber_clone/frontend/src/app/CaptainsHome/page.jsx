"use client"
import React, { useRef, useState } from "react";
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css';
import CaptainProtectedWraper from '../../CaptainProtectedWraper'
import CaptainDetails from '@/components/CaptainsDetails/page';
import RiderpopUP from '@/components/RidePopUp/page';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {
  const ridePopUpPanelRef = useRef(null)

const [ridePopUpPanel, setRidePopUpPanel] = useState(false)

  useGSAP(() => {
    gsap.to(ridePopUpPanelRef.current, {
      y: ridePopUpPanel ? "-100%" : "0%"
    });
  }, { dependencies: [ridePopUpPanel] });


  return (
    <CaptainProtectedWraper>
        <div className='h-screen  text-white flex flex-col'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className="text-3xl font-semibold text-black">Cab X</h1>
      <Link href="/captainlogin" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414]'>
        <i className="ri-logout-box-r-line"></i>
      </Link>
      <h5 
           onClick={()=>{
            setRidePopUpPanel(false)
           }}
           className="p-1 text-center w-[93%] absolute top-0">
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
      </div>
        <div className='w-full h-3/5'>
          <img
            className='w-full h-full object-cover'
            src='https://pbs.twimg.com/media/DsdWxZHX4AAj0Dp.jpg:large'
            alt=''
          />
        </div>

        <div className='h-2/5 p-6 rounded-t-2xl bg-[#141414]'>
         <CaptainDetails />
        </div>
        <div
        ref={ridePopUpPanelRef}
         className='fixed w-full z-10 p-6 rounded-b-2xl bg-[#141414]'>
         <RiderpopUP setRidePopUpPanel={setRidePopUpPanel}  />
        </div>
      </div>
    </CaptainProtectedWraper>

  )
}

export default CaptainHome
"use client"
import React from "react";
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css';

const FinishRide = () => {
  return (
     <div>
          <h3 className="text-center text-xl font-semibold mb-2">A Ride for you</h3>
          <hr className="border-zinc-700 border-t-[0.2]" />
       <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center just-start gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src="https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg" alt="" />
            <h4 className='text-lg font-medium'>PushkarVerma</h4>
          </div>
            <h4>4.5 km</h4>
         </div>
            <div className='w-full px-4'>
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-map-pin-user-fill"></i>
                <div>
                      <h3 className='text-lg font-medium'>562/11-A</h3>
                      <p className=' mb-3 text-xs'>Kankariya talab,Ahemdabad</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-map-pin-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                      <p className='mb-3  text-xs'>17th Cross Rd,PWD Quarters,1st sector HSR layout,Bengaluru,Karnataka</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-currency-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>₹193.20</h3>
                      <p className='mb-3 text-xs'>Cash Cash</p>
                </div>
                </div>
           </div>
         <div className='flex flex-col mt-15 items-center justify-between'>
          <Link href="/CaptainsHome"
           onClick={()=>{

           }}
           className='flex justify-center w-full bg-green-600 mt-5 px-3 py-2 rounded-lg font-semibold'>Finish Ride</Link>
         </div>
         </div>
  )
}

export default FinishRide
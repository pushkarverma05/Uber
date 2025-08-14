import Link from 'next/link'
import React from 'react'

const RiderpopUP = (props) => {
  return (
    <div><h5 
           onClick={()=>{
            props.setRidePopUpPanel(true)
           }}
           className="p-1 opacity-0 text-center w-[93%] absolute top-0">
              <i className="ri-arrow-up-wide-line"></i>
            </h5>
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
                      <p className=' text-xs'>Kankariya talab,Ahemdabad</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-map-pin-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                      <p className=' text-xs'>17th Cross Rd,PWD Quarters,1st sector HSR layout,Bengaluru,Karnataka</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-2 gap-5'>
                    <i className="ri-currency-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>₹193.20</h3>
                      <p className='text-xs'>Cash Cash</p>
                </div>
                </div>
           </div>
         <div className='flex gap-4 items-center justify-between'>
          <button
           onClick={()=>{
            props.setRidePopUpPanel(true)
           }}
           className='w-1/2 bg-red-500 mt-5 px-3 py-2 rounded-lg font-semibold'>Decline</button>
          <Link href="/captainRiding"
           onClick={()=>{
            props.setRidePopUpPanel(false)
           }}
           className='flex justify-center w-1/2 bg-green-600 mt-5 px-3 py-2 rounded-lg font-semibold'>Accept</Link>
         </div>
         </div>
  )
}

export default RiderpopUP
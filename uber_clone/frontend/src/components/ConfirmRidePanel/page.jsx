import React from 'react'

const ConfirmRide = (props) => {
  return (
      <div><h5 
           onClick={()=>{
            props.setConfirmRidePanel(false)
           }}
           className="absolute opacity left-5 top-5 text-xl bg-[#1A1A1A] h-10 w-12 rounded-xl flex items-center justify-center">
              <i className="ri-arrow-left-long-line"></i>
            </h5>
          <h3 className="text-center text-xl font-semibold mb-5">Confirm you trip</h3>
          <hr className="border-zinc-700 border-t-[0.2]" />
          <div className='flex gap-4 flex-col justify-between items-center'>
           <img className="h-30" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png" alt="" />
           <div className='w-full px-4 mt-5'>
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-map-pin-user-fill"></i>
                <div>
                      <h3 className='text-lg font-medium'>{props.pickup.slice(0,15)}</h3>
                      <p className='mt-1 text-xs'>{props.pickup}</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-map-pin-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>{props.destination.slice(0,15)}</h3>
                      <p className='mt-1 text-xs'>{props.destination}</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-currency-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                      <p className='mt-1 text-xs'>Cash</p>
                </div>
                </div>
           </div>
           <button
           onClick={()=>{
            props.setVehicleFound(true)
            props.createRide() 
           }}
           className='bg-blue-500 mt-5 w-full px-6 py-2 rounded-lg font-semibold'>Confirm</button>
          </div>
          </div>
  )
}

export default ConfirmRide
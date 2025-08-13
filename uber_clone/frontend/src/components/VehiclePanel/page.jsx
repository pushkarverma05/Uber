import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div><h5 
           onClick={()=>{
            props.setVehiclePanel(false)
           }}
           className="absolute opacity left-5 top-5 text-xl bg-[#1A1A1A] h-10 w-12 rounded-xl flex items-center justify-center">
              <i className="ri-arrow-left-long-line"></i>
            </h5>
          <h3 className="text-center text-xl font-semibold mb-5">Choose a trip</h3>
          <hr className="border-zinc-700 border-t-[0.2]" />
          <h6 className="font-light text-sm mt-3">Rides we think you'll like</h6>
          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className="flex w-full active:border bg-[#1A1A1A] rounded-xl p-3 my-3 items-center justify-between">
                <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png" alt="" />
                <div className="w-1/2">
                  <h4 className="font-medium text-xl">Sedan <span className="font-base text-sm"><i className="ri-user-3-fill"></i>4</span></h4>
                  <h5 className="text-sm">2 mins away</h5>
                  <p className="text-[10px]">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹193.20</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }}  className="flex w-full active:border bg-[#1A1A1A]  rounded-xl p-3 my-3 items-center justify-between">
                <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className="w-1/2">
                  <h4 className="font-medium text-xl">Auto <span className="font-base text-sm"><i className="ri-user-3-fill"></i>4</span></h4>
                  <h5 className="text-sm">2 mins away</h5>
                  <p className="text-[10px]">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹57.99</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmRidePanel(true)
          }} className="flex w-full active:border bg-[#1A1A1A] rounded-xl p-3 my-3 items-center justify-between">
                <img className="h-12" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1696608495/assets/97/d3e455-c9f3-499a-b7ad-56ae11c80287/original/UberMotorcycle.png" alt="" />
                <div className="w-1/2">
                  <h4 className="font-medium text-xl">Moto <span className="font-base text-sm"><i className="ri-user-3-fill"></i>4</span></h4>
                  <h5 className="text-sm">2 mins away</h5>
                  <p className="text-[10px]">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">₹32.26</h2>
          </div></div>
  )
}

export default VehiclePanel
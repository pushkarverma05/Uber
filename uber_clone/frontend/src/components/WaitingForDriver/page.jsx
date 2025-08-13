import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div><h5 
           onClick={()=>{
            props.vehicleWaiting(false)
           }}
           className="absolute opacity left-5 top-5 text-xl bg-[#1A1A1A] h-10 w-12 rounded-xl flex items-center justify-center">
              <i className="ri-arrow-left-long-line"></i>
            </h5>
            <div className='flex items-center justify-between p-5'>
               <img className="h-15" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png" alt="" />
               <div className='text-right '>
                <h2 className='text-md font-medium'>Pushkar</h2>
                <h4 className='text-2xl font-medium'>RJ 14 CS 7171</h4>
                <p className='text-sm text-white/60'>Tesla X</p>
               </div>
            </div>

          <hr className="border-zinc-700 border-t-[0.2]" />
          <div className='flex gap-4 flex-col justify-between items-center'>

           <div className='w-full px-4 mt-5'>
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-map-pin-user-fill"></i>
                <div>
                      <h3 className='text-lg font-medium'>562/11-A</h3>
                      <p className='mt-1 text-xs'>Kankariya talab,Ahemdabad</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-map-pin-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                      <p className='mt-1 text-xs'>17th Cross Rd,PWD Quarters,1st sector HSR layout,Bengaluru,Karnataka</p>
                </div>
                </div>
                <hr className="border-zinc-700 border-t-[0.2]" />
                <div className='flex items-center py-3 gap-5'>
                    <i className="ri-currency-line"></i>
                <div>
                      <h3 className='text-lg font-medium'>₹193.20</h3>
                      <p className='mt-1 text-xs'>Cash Cash</p>
                </div>
                </div>
           </div>
          </div>
          </div>
  )
}

export default WaitingForDriver
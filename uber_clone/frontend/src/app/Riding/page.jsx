import UserProtectedWraper from '@/UserProtectedWraper'
import React from 'react'
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';

const Riding = () => {
  return (
    <UserProtectedWraper>
      <div className='h-screen bg-[#141414] text-white flex flex-col'>
      <Link href="/Home" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414]'>
        <i className="ri-home-line"></i>
      </Link>
        <div className='w-full flex-shrink-0'>
          <img
            className='w-full h-auto max-h-[48vh] object-cover'
            src='https://pbs.twimg.com/media/DsdWxZHX4AAj0Dp.jpg:large'
            alt=''
          />
        </div>

        <div className='flex-1 px-4 overflow-y-auto'>
          <div className='flex items-center justify-between py-5'>
            <img
              className='h-10 object-contain'
              src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png'
              alt=''
            />
            <div className='text-right'>
              <h2 className='text-md font-medium'>Pushkar</h2>
              <h4 className='text-2xl font-medium'>RJ 14 CS 7171</h4>
              <p className='text-sm text-white/60'>Tesla X</p>
            </div>
          </div>

          <hr className='border-zinc-700 border-t-[0.2]' />

            <div className='w-full'>
              <div className='flex items-center py-3 gap-5'>
                <i className='ri-map-pin-user-fill'></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='mt-1 text-xs'>Kankariya talab,Ahemdabad</p>
                </div>
              </div>

              <hr className='border-zinc-700 border-t-[0.2]' />

              <div className='flex items-center py-3 gap-5'>
                <i className='ri-map-pin-line'></i>
                <div>
                  <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                  <p className='mt-1 text-xs'>
                    17th Cross Rd,PWD Quarters,1st sector HSR layout,Bengaluru,Karnataka
                  </p>
                </div>
              </div>

              <hr className='border-zinc-700 border-t-[0.2]' />

              <div className='flex items-center py-3 gap-5'>
                <i className='ri-currency-line'></i>
                <div>
                  <h3 className='text-lg font-medium'>₹193.20</h3>
                  <p className='mt-1 text-xs'>Cash Cash</p>
                </div>
              </div>
            </div>

          <div className='mt-4 pb-6'>
            <button className='w-full bg-white text-black py-3 rounded-lg font-medium'>
              Make a Payment
            </button>
          </div>
        </div>
      </div>
    </UserProtectedWraper>
  )
}

export default Riding
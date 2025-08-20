"use client";
import UserProtectedWraper from '@/UserProtectedWraper'
import React, { useEffect, useState, useContext, Suspense } from 'react'
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '@/components/LiveTracking/page';

function RidingContent() {
  const searchParams = useSearchParams();
  const rideParam = searchParams.get('ride');
  const [rideData, setRideData] = useState(null);
  const { socket } = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    socket.on('ride-completed', () => {
      router.push('/Home');
    });
    return () => {
      socket.off('ride-completed');
    };
  }, [socket, router]);

  useEffect(() => {
    if (rideParam) {
      try {
        setRideData(JSON.parse(rideParam));
      } catch (e) {
        console.error('Invalid ride query param', e);
      }
    }
  }, [rideParam]);

  return (
    <div className='h-screen bg-[#141414] text-white flex flex-col'>
      <Link href="/Home" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414] z-10'>
        <i className="ri-home-line"></i>
      </Link>

      {/* Top half: Live tracking */}
      <div className='w-full h-1/2 relative'>
        <div className="absolute inset-0">
          <LiveTracking ride={rideData} />
        </div>
      </div>

      {/* Bottom half: Ride details */}
      <div className='h-1/2 px-4 overflow-y-auto'>
        <div className='flex items-center justify-between py-5'>
          <img className='h-10 object-contain'
               src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png'
               alt='' />
          <div className='text-right'>
            <h2 className='text-md font-medium'>
              {rideData?.captain?.fullname?.firstname} {rideData?.captain?.fullname?.lastname}
            </h2>
            <h4 className='text-2xl font-medium'>{rideData?.captain?.vehicle?.plate}</h4>
            <p className='text-sm text-white/60'>{rideData?.captain?.vehicle?.model || 'Vehicle'}</p>
          </div>
        </div>
        <hr className='border-zinc-700 border-t-[0.2]' />
        <div className='w-full'>
          <div className='flex items-center py-3 gap-5'>
            <i className='ri-map-pin-user-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>{rideData?.pickup?.slice(0,15)}</h3>
              <p className='mt-1 text-xs break-words'>{rideData?.pickup}</p>
            </div>
          </div>
          <hr className='border-zinc-700 border-t-[0.2]' />
          <div className='flex items-center py-3 gap-5'>
            <i className='ri-map-pin-line'></i>
            <div>
              <h3 className='text-lg font-medium'>{rideData?.destination?.slice(0,18)}</h3>
              <p className='mt-1 text-xs break-words'>{rideData?.destination}</p>
            </div>
          </div>
          <hr className='border-zinc-700 border-t-[0.2]' />
          <div className='flex items-center py-3 gap-5'>
            <i className='ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{rideData?.fare}</h3>
              <p className='mt-1 text-xs'>{rideData?.paymentMethod || 'Cash'}</p>
            </div>
          </div>
        </div>
        <div className='mt-4 pb-6'>
          <button className='w-full bg-white text-black py-3 rounded-lg font-medium' disabled={!rideData}>
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Riding() {
  return (
    <UserProtectedWraper>
      <Suspense fallback={<div className="text-white p-4">Loading ride...</div>}>
        <RidingContent />
      </Suspense>
    </UserProtectedWraper>
  );
}
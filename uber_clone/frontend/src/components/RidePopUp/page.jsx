'use client'
  import Link from 'next/link'
  import React from 'react'

  const RidePopUp = (props) => {

    return (
      <div className="w-full rounded-t-2xl bg-zinc-900 text-white p-4 pb-6 overflow-hidden">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">New Ride Available</h3>
          <button
            onClick={() => props.setRidePopupPanel(false)}
            className="text-zinc-400 hover:text-white text-2xl leading-none"
            aria-label="Close"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src='https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg'
              alt=''
            />
            <h4 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>
          </div>
          <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">4.5km</span>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex gap-4">
            <div className="text-green-400 pt-1">
              <i className="ri-map-pin-user-fill"></i>
            </div>
            <div>
              <h5 className="font-medium">{props.ride?.pickup.slice(0,15)}</h5>
              <p className="text-xs text-zinc-400">{props.ride?.pickup}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-yellow-400 pt-1">
              <i className="ri-map-pin-line"></i>
            </div>
            <div>
              <h5 className="font-medium">{props.ride?.destination.slice(0,15)}</h5>
              <p className="text-xs text-zinc-400">{props.ride?.destination}</p>
            </div>
          </div>

          <div className="flex gap-4">
              <div className="text-emerald-400 pt-1">
                <i className="ri-currency-line"></i>
              </div>
              <div>
                <h5 className="font-medium">₹{props.ride?.fare}</h5>
                <p className="text-xs text-zinc-400">Cash</p>
              </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={()=>{
              props.setRidePopupPanel(false)
            }}
            className="w-1/2 bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg font-semibold"
          >
            Decline
          </button>
          <Link
            href={`/captainRiding?rideId=${props.ride?._id || ''}`}
            onClick={() => {
              props.setRidePopupPanel(false)
              props.confirmRide();
            }}
            className="w-1/2 text-center bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg font-semibold"
          >
            Accept
          </Link>
        </div>
      </div>
    )
  }

  export default RidePopUp
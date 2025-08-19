"use client"
import React, { useRef, useState } from "react";
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css';
import CaptainProtectedWraper from '../../CaptainProtectedWraper'
import CaptainDetails from '@/components/CaptainsDetails/page';
import RiderpopUP from '@/components/RidePopUp/page';
import { useEffect ,useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import CaptainRiding from "../captainRiding/page";
import FinishRide from "../FinishRide/page";
import LiveTracking from "@/components/LiveTracking/page";


const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [captainRidingPanel, setCaptainRidingPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const captainRidingPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)


  
useEffect(() => {
  if (!socket || !captain?._id) return;

  socket.emit("join", {
    userId: captain._id,
    userType: "captain"
  });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("update-location-captain", {
          userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }
        });
      });
    }
  };

  const handleNewRide = (data) => {
    console.log("📩 New ride received:", data);
    setRide(data);
    setRidePopupPanel(true);
  };

  socket.on('new-ride', handleNewRide);

  const locationInterval = setInterval(updateLocation, 10000);
  updateLocation();

  return () => {
    clearInterval(locationInterval);
    socket.off('new-ride', handleNewRide);
  };
}, [socket, captain?._id]);

async function confirmRide() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rides/confirm`,
      { rideId: ride._id , captain: captain._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    // Persist rideId for /captainRiding route fallback
    if (ride?._id) {
      localStorage.setItem('currentRideId', ride._id);
    }
    setRidePopupPanel(false);
    setCaptainRidingPanel(true);
  } catch (error) {
    console.error("Error confirming ride:", error);
  }
}

useGSAP(() => {
  if (!ridePopupPanelRef.current) return;

  if (ridePopupPanel) {
    // Slide up
    gsap.to(ridePopupPanelRef.current, {
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    // Slide down
    gsap.to(ridePopupPanelRef.current, {
      y: "100%",
      duration: 0.4,
      ease: "power2.in",
    });
  }
}, [ridePopupPanel]);

useGSAP(() => {
  if (!captainRidingPanelRef.current) return;

  if (captainRidingPanel) {
    // Slide up
    gsap.to(captainRidingPanelRef.current, {
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    // Slide down
    gsap.to(captainRidingPanelRef.current, {
      y: "100%",
      duration: 0.4,
      ease: "power2.in",
    });
  }
}, [captainRidingPanel]);


  return (
    <CaptainProtectedWraper>
        <div className='h-screen text-white'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <h1 className="text-3xl font-semibold text-black">Cab X</h1>
      <Link href="/captainlogin" className='fixed h-10 w-10 flex right-2 top-2 rounded-full items-center justify-center bg-[#141414]'>
        <i className="ri-logout-box-r-line"></i>
      </Link>
      </div>
        <div className='w-full h-1/2'>
          <LiveTracking />
        </div>

        <div className='h-1/2 p-6 rounded-t-2xl bg-[#141414]'>
         <CaptainDetails />
        </div>
              
       {/* Rider PopUp Panel */}
          <div
            ref={ridePopupPanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full pt-12"
          >
            <RiderpopUP 
              ride={ride}
              setRidePopupPanel={setRidePopupPanel}
              confirmRide={confirmRide} />
          </div>

          {/* Captain Riding Panel */}
          <div
            ref={captainRidingPanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full pt-12"
          >
            <CaptainRiding 
              ride={ride}
            />
          </div>
      </div>
    </CaptainProtectedWraper>

  )
}

export default CaptainHome
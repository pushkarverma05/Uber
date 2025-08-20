"use client";
import React, { useEffect, useRef, useState,useContext } from "react";
import UserProtectedWraper from "../../UserProtectedWraper";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSeachPanel from "../../components/LocationSearchPanel/page";
import VehiclePanel from "../../components/VehiclePanel/page";
import ConfirmRide from "@/components/ConfirmRidePanel/page";
import SearchPanel from "@/components/SearchPanel/page";
import LookingForDriver from "@/components/LookingForDriver/page";
import WaitingForDriver from "@/components/WaitingForDriver/page";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useRouter } from "next/navigation";


const UserHome = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [vehicleWaiting, setvehicleWaiting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);


const [fare, setFare] = useState({});
const [vehicleType, setVehicleType] = useState(null);
const [ride , setRide] = useState(null);
const [pickup, setPickup] = useState("");
const [destination, setDestination] = useState("");

const { socket } = useContext(SocketContext);
const { user } = useContext(UserDataContext);

const router = useRouter();

  // Shared state for both panels

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const vehicleWaitingRef = useRef(null);

 useEffect(() => {
    socket.emit("join", {
      userId: user._id,
      userType: "user",
    });
}, [user]);

useEffect(() => {
  if (!socket) return;
  const handleRideConfirmed = (ride) => {
    console.log("Ride confirmed:", ride);
    setVehicleFound(false);
    setvehicleWaiting(true);
    setRide(ride);
  };
  const handleRideStarted = (ride) => {
    setvehicleWaiting(false);
    setRide(ride);
    // Pass ride via search params
    const rideStr = encodeURIComponent(JSON.stringify(ride));
    router.push(`/Riding?ride=${rideStr}`);
  };
  socket.on('ride-confirmed', handleRideConfirmed);
  socket.on('ride-started', handleRideStarted);
  return () => {
    socket.off('ride-confirmed', handleRideConfirmed);
    socket.off('ride-started', handleRideStarted);
  };
}, [socket, router]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    // Fetch suggestions based on the input
    if (e.target.value.trim() === "") {
      setPickupSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPickupSuggestions(response.data.suggestions || []);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500) {
          console.error("Server error (500) while fetching pickup suggestions.");
          // Graceful degradation: clear suggestions (or keep previous)
          setPickupSuggestions([]);
          return;
        }
      }
      console.error("Error fetching suggestions:", error);
      setPickupSuggestions([]);
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/maps/get-suggestions`,{
         params : { input : e.target.value },
         headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}` 
         }
        
        });
        setDestinationSuggestions(response.data.suggestions); // Assuming the response contains suggestions

    }catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
      gsap.to(panelRef.current, {
        x: panelOpen ? "0%" : "100%"
      });
  }, { dependencies: [panelOpen] });

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      x: vehiclePanel ? "0%" : "100%"
    });
  }, { dependencies: [vehiclePanel] });

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      x: confirmRidePanel ? "0%" : "100%"
    });
  }, { dependencies: [confirmRidePanel] });

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      x: vehicleFound ? "0%" : "100%"
    });
  }, { dependencies: [vehicleFound] });

  useGSAP(() => {
    gsap.to(vehicleWaitingRef.current, {
      x: vehicleWaiting ? "0%" : "100%"
    });
  }, { dependencies: [vehicleWaiting] });

   async function findtrip() {
    try {
      setVehiclePanel(true);
      setPanelOpen(false);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFare(response.data.fare); // Assuming the response contains fare details
      console.log(response.data.fare);
    } catch (error) {
      console.error("Error fetching fare:", error);
      alert("Failed to fetch fare. Please try again.");
    }
  }

 async function createRide() {
  try {
   const response = await axios.post(
  `${process.env.NEXT_PUBLIC_BASE_URL}/rides/create`,
  {
    pickup,
    destination,
    vehicleType,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // add token
    }
  }
);
    console.log(response.data);
  } catch (error) {
    console.error("Error creating ride:", error);
  }
}




  return (
    <UserProtectedWraper>
      <div className="h-screen relative overflow-hidden bg-[#141414] text-white">
        <h1 className="absolute left-5 top-5 text-4xl">Cab X</h1>
        <div className="flex flex-col justify-end w-full h-screen absolute top-0">
          <div className="h-[90%] p-6 relative">
            {/* Home panel - no back arrow */}
            <SearchPanel
              setPanelOpen={setPanelOpen}
              pickup={pickup}
              setPickup={setPickup}
              destination={destination}
              setDestination={setDestination}
              submitHandler={submitHandler}
              activeField={activeField}
              setActiveField={setActiveField}
              showBackArrow={false}
              handlePickupChange={handlePickupChange}
              handleDestinationChange={handleDestinationChange}
              setVehiclePanel={setVehiclePanel}
              findtrip={findtrip}
            />
          </div>

          <div
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-full translate-x-full bg-[#141414]"
          >
            <div className="p-6">
              {/* Location panel - show back arrow */}
              <SearchPanel
                setPanelOpen={setPanelOpen}
                pickup={pickup}
                setPickup={setPickup}
                destination={destination}
                setDestination={setDestination}
                submitHandler={submitHandler}
                activeField={activeField}
                setActiveField={setActiveField}
                showBackArrow={true}
                handlePickupChange={handlePickupChange}
                handleDestinationChange={handleDestinationChange}
                setVehiclePanel={setVehiclePanel}
                findtrip={findtrip}
              />
            </div>
            <LocationSeachPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]"
        >
          <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]">
          <ConfirmRide  
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
           setVehicleFound={setVehicleFound}/>
        </div>
        <div
        ref={vehicleFoundRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]">
          <LookingForDriver 
               pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
        </div>
        <div
        ref={vehicleWaitingRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full  px-3 py-7 bg-[#141414]">
          <WaitingForDriver 
          ride={ride}
          vehicleWaiting={setvehicleWaiting} />
        {/* LiveTracking improvements allow passing full ride elsewhere (Riding page). */}
        </div>
      </div>
    </UserProtectedWraper>
  );
};

export default UserHome;
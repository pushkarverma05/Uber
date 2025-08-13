"use client";
import React, { useRef, useState } from "react";
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

const UserHome = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [vehicleWaiting, setvehicleWaiting] = useState(false);

  // Shared state for both panels
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const vehicleWaitingRef = useRef(null);

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
              showBackArrow={false}
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
                showBackArrow={true}
              />
            </div>
            <LocationSeachPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]">
          <ConfirmRide   setConfirmRidePanel={setConfirmRidePanel}
           setVehicleFound={setVehicleFound}/>
        </div>
        <div
        ref={vehicleFoundRef}
          className="fixed w-full h-full z-10 right-0 top-0 translate-x-full px-3 py-7 bg-[#141414]">
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div
        ref={vehicleWaitingRef}
          className="fixed w-full h-full z-10 right-0 top-0  px-3 py-7 bg-[#141414]">
          <WaitingForDriver vehicleWaiting={vehicleWaiting} />
        </div>
      </div>
    </UserProtectedWraper>
  );
};

export default UserHome;
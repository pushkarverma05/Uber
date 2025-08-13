import React, { useRef } from "react";

const SearchPanel = ({
  setPanelOpen,
  pickup,
  setPickup,
  destination,
  setDestination,
  submitHandler,
  showBackArrow
}) => {
  return (
    <div>
      {showBackArrow && (
        <h5
          onClick={() => setPanelOpen(false)}
          className="absolute left-5 top-5 text-xl bg-[#1A1A1A] h-10 w-12 rounded-xl flex items-center justify-center"
        >
          <i className="ri-arrow-left-long-line"></i>
        </h5>
      )}

      <h4 className="text-2xl font-semibold text-center">Find a trip</h4>

      <form
        className="w-full border-[1.5] rounded-xl mt-5 p-2"
        onSubmit={submitHandler}
      >
        <input
          onClick={() => setPanelOpen(true)}
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="pr-10 pl-4 font-light outline-none mb-2 w-full"
          type="text"
          placeholder="Add a pickup location"
        />
        <hr className="border-zinc-700 border-t-[0.2]" />
        <input
          onClick={() => setPanelOpen(true)}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="pr-10 pl-4 font-light outline-none mt-2 w-full"
          type="text"
          placeholder="Enter your destination"
        />
      </form>
    </div>
  );
};

export default SearchPanel;
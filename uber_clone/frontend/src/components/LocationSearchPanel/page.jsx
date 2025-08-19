"use client";
import React from 'react';

const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField }) => {
const handleSuggestionClick = (item) => {
  const displayName = `${item.name}${item.city ? `, ${item.city}` : ""}${item.country ? `, ${item.country}` : ""}`;

  if (activeField === 'pickup') {
    setPickup(displayName);
  } else if (activeField === 'destination') {
    setDestination(displayName);
  }

  // setVehiclePanel(false);
  // setPanelOpen(false);
};

  return (
    <div>
      {suggestions && suggestions.length > 0 && suggestions.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(item)}
          className="flex mx-6 p-3 my-2 gap-4 items-center justify-start"
        >
          <h2 className="bg-neutral-800 h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-extralight">
            {item.name}
            {item.city && `, ${item.city}`}
            {item.country && `, ${item.country}`}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
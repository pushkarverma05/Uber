import React from 'react'

const LocationSearchPanel = (props) => {

  // sample array for location
  const locations = [
    "24A, Near Kapoor's Cafe,Jaipur",
    "24B, Malviya Nagar,jaipur",
    "24C, Pratap nagar", 
    "24D, Pratap nagar",
    "24E, Pratap nagar",
  ]
  return (
    <div>
      {
        locations.map(function(loc){
          return  <div onClick={()=>{
              props.setVehiclePanel(true)
          }} 
          key={loc} className='flex mx-6 p-3 my-2 gap-4 items-center justify-start'>
        <h2 className='bg-neutral-800 h-8 w-8 flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-line"></i>
          </h2>
        <h4 className='font-extralight'>{loc}</h4>
      </div>
        })
      }
   
    </div>
  )
}

export default LocationSearchPanel
"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import axios from 'axios';
import { CaptainDataContext } from './app/context/CaptainContext';

const CaptainProtectedWraper = ({
  children
}) => {
  const router = useRouter();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isloading , setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/captainlogin");
      return;
    }
  

  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  .then((response) => {
    if(response.status === 200) {
      setCaptain(response.data.captain);
      setIsLoading(false);
    }
  })
  .catch(error => {
    console.log(error);
    localStorage.removeItem('token');
    router.replace("/captainlogin");
  });

},[router, setCaptain]);
if(isloading){
  return  (
    <div>Loading...</div>
  )
};

return (
  <>
    {children}
    </>
  )
}

export default CaptainProtectedWraper
"use client"
import React, { use } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CaptainProtectedWraper from '../../CaptainProtectedWraper';


const captainLogout = () => {
    const router = useRouter();

    useEffect(() => {   
    const token = localStorage.getItem("token");
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
        if(response.status === 200) {
          localStorage.removeItem("token");
          router.replace("/captainlogin");
        }
    });
}, []);
  return (
        <CaptainProtectedWraper>
        <div>CaptainLogout</div>
        </CaptainProtectedWraper>
  )
}

export default captainLogout
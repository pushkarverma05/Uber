"use client"
import React, { use } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserProtectedWraper from '../../UserProtectedWraper';


const UserLogout = () => {
    const router = useRouter();

    useEffect(() => {   
    const token = localStorage.getItem("token");
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
        if(response.status === 200) {
          localStorage.removeItem("token");
          router.replace("/Userlogin");
        }
    });
}, []);
  return (
    <UserProtectedWraper>
        <div>UserLogout</div>
    </UserProtectedWraper>
  )
}

export default UserLogout
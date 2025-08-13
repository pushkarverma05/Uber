"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from './app/context/UserContext';

const UserProtectedWraper = ({
    children
}) => {
    const router = useRouter();
     const { setUser } = useContext(UserDataContext);
     const [isloading , setIsLoading] = useState(true);
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/Userlogin");
      return;
    }
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  .then((response) => {
    if(response.status === 200) {
      setUser(response.data.user);
      setIsLoading(false);
    }
  })
  .catch(error => {
    console.log(error);
    localStorage.removeItem('token');
    router.replace("/Userlogin");
  });

},[router, setUser]);
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
export default UserProtectedWraper
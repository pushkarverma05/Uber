"use client";
import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
   const [isloading ,setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  });
  const value ={
    user,
    setUser,
    isloading,
    setIsLoading,
  }

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};
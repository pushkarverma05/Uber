"use client";
import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [isloading ,setIsLoading] = useState(false);
  const [captain, setCaptain] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  });
  const value ={
    captain,
    setCaptain,
    isloading,
    setIsLoading,
  }

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
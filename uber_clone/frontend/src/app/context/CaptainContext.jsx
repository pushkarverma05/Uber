"use client";
import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainProvider = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
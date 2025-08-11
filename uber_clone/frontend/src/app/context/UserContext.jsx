"use client";
import React, { createContext, useState } from "react";

export const UserDataContext = createContext();
// Create context


// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email:'',
    fullname:{
        firstname:'',
        lastname:''
    }
  }); // You can store user data here

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};
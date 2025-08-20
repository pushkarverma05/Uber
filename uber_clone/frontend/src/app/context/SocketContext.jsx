"use client";

import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`,{
  withCredentials: true
});
export const SocketProvider = ({ children }) => {

  useEffect(() => {

    socket.on("connect", () => {

      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {

        console.log("Disconnected from socket server");
    });

  }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

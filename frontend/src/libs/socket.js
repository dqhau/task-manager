import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token },
    });

    socket.on("connect", () => console.log("Connected to Socket.io server"));
    socket.on("disconnect", () => console.log("Disconnected from server"));
  }
};

export const getSocket = () => socket;

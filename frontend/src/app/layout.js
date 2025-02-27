"use client";
import { useEffect } from "react";
import { connectSocket } from "@/libs/socket";

export default function RootLayout({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      connectSocket(token);
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

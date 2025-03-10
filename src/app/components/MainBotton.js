"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import useProtectedRoute from "../auth/register/Hooks/useProtectedRoutes";

export default function MainButton() {
  const [isHovered, setIsHovered] = useState(false);
  

  const session = useProtectedRoute();

  


  const baseStyle = {
    background: isHovered ? "#003161" : "#1e40af", // Cambia el color en hover

    borderRadius: "10px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.3s ease", // Animación suave
  };

  return (
    <div className="mt-5 mb-10 font-bold" style={{ textAlignLast: "center" }}>
      {session ? (
        <Link href="/dashboard" passHref>
          <Button
            color="default"
            className="text-white"
            style={baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Dashboard
          </Button>
        </Link>
      ) : (
        <Link href="/login" passHref>
          <Button
            color="default"
            className="text-white"
            style={baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}
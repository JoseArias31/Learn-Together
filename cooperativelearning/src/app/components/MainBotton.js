"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { getUser } from "../auth/register/keepLogginIn";

export default function MainButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const loggedInUser = await getUser();
        setUser(loggedInUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    checkUser();
  }, []); // <- Se ejecuta solo una vez al montar

  


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
      {user ? (
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
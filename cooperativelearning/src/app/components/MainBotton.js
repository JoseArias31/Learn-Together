"use client"

import React from "react";
import {Button} from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
export default function MainButton() {
  
  const [isHovered, setIsHovered] = useState(false);
  
  const baseStyle = {
    background: isHovered ? "#1e40af" : "#000000bf", // Cambia el color en hover


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
  <div className="mt-5 mb-10 font-bold " style={{textAlignLast:"center"}}>
  <Link href="/login" passHref>
   <Button href="login" color="default" className="text-white " style={baseStyle}  onMouseEnter={() => setIsHovered(true)}  onMouseLeave={() => setIsHovered(false)} >
      Get Started
    </Button>
    </Link>
    </div>
  );
}

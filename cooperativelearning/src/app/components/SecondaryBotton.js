"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SecondaryButton() {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle2 = {
    background: isHovered ? "#003161" : "#1e40af", // Change background on hover
  
   

    borderRadius: "10px",
    padding: "0.5rem 1rem",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.3s ease",
    textDecoration: "none", // For Link
  };

  return (
    <div className="mt-5 mb-10 font-bold" style={{ textAlign: "center" }}>
      <Link href="/programs" passHref>
        <button
          style={baseStyle2}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          More
        </button>
      </Link>
    </div>
  );
}

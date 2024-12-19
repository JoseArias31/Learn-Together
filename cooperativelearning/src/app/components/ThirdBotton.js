"use client"

import React from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";




export default function ThirdButton() {

const [isHover, setHover] = useState(false);
const style3 ={
  background: isHover ? "#1e40af" : "black",

    borderRadius: "10px",
     paddingLeft:"1rem",
      paddingRight:"1rem",
       paddingTop:"0.5rem",
        paddingBottom:"0.5rem",
        transition: "background 0.3s ease",
        textDecoration: "none", // For Link

  
}

  return (
  <div className="mt-5 mb-10 font-bold" style={{textAlignLast:"center"}}>
  <Link href="/programs" passHref>
   <Button href="login" color="default" className="text-white" style={style3} 
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}>
     Check for More
    </Button>
    </Link>
    </div>
  );
}

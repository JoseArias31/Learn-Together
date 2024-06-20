import React from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
export default function MainButton() {
  return (
  <div className="mt-5 mb-10 font-bold" style={{textAlignLast:"center"}}>
  <Link href="/login" passHref>
   <Button href="login" color="default" className="text-white" style={{background:"#0C0C1D", border: "1px solid #fff", borderRadius: "10px", paddingLeft:"1rem", paddingRight:"1rem", paddingTop:"0.5rem", paddingBottom:"0.5rem"}} >
      Get Started
    </Button>
    </Link>
    </div>
  );
}

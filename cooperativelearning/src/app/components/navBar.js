'use client'

import Link from 'next/link';
import '../globals.css'
import Image from 'next/image'
import logo from '../../../public/logoNB.png';
import { getUser } from '../auth/register/keepLogginIn'
import { signOutUser } from '../auth/register/signOut';
import { useEffect, useState } from 'react';


const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Llamamos a la función getUser para saber si el usuario está loggeado
    const checkUser = async () => {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
    };
    checkUser();
  }, []);
  
  const handlgeSignOut = async () => {
    const { success, error } = await signOutUser();
    if (success) {
      setUser(null); // Actualiza el estado para reflejar que el usuario no está loggeado
    } else {
      console.log("Error signing out:", error);
    }
  };





  return(

    <nav className="p-4 flex justify-start items-center" style={{background:'#000000bf', justifyContent:'space-between'}}>

<div className='flex items-center gap-4'>
    <Image className='relative z-10' src={logo} alt="Logo" width={41} />
    <h1
  className="text-white font-bold text-2xl sm:text-3xl md:text-4xl font-sans tracking-wide"
  style={{
    background: "linear-gradient(to right, #4CAF50, #1E90FF)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }}
>
  Learn Together
</h1>

    </div>


       
    <ul className="flex space-x-4" style={{justifyContent:'right'}}>
    
      <li className='content-center'>
        <Link href="/contact" className="text-white">
          Contact
        </Link>
      </li>
      <li>
      {user ? (
            <button
              onClick={handlgeSignOut}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </Link>
          )}
      </li>
   
    </ul>
   
  </nav>


);
}


export default NavBar;



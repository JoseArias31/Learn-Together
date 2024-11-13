'use client'

import Link from 'next/link';
import '../globals.css'
import Image from 'next/image'
import logo from '../../../public/Logo.png';
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

    <nav className="p-4 flex justify-start items-center" style={{background:'#0C0C1D', justifyContent:'space-between'}}>

<div className='flex items-center gap-4'>
    <Image className='relative z-10' src={logo} alt="Logo" width={41} />
    <h1 className='text-white' style={{fontSize:'1.875rem'}}>Learn Together</h1>
    </div>


       
    <ul className="flex space-x-4" style={{justifyContent:'right'}}>
    
      <li>
        <Link href="/contact" className="text-white">
          Contact
        </Link>
      </li>
      <li>
      {user ? (
            <button
              onClick={handlgeSignOut}
              className="text-white"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="text-white">
              Sign in
            </Link>
          )}
      </li>
   
    </ul>
   
  </nav>


);
}


export default NavBar;



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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };
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





  return (
    <nav className="relative p-4 flex justify-between items-center" style={{ background: '#000000bf' }}>
      <div className="flex items-center gap-4">
        <Image className="relative z-10" src={logo} alt="Logo" width={41} />
        <h1
          className="text-white font-bold text-2xl sm:text-3xl md:text-4xl font-sans tracking-wide"
          style={{
            background: 'linear-gradient(to right, #4CAF50, #1E90FF)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Learn Together
        </h1>
      </div>

      {/* Icono de toggle en dispositivos móviles */}
      <div className="lg:hidden flex items-center">
        <button onClick={handleToggle} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú desplegable - se superpone en móviles */}
      <div
        className={`absolute top-0 right-0 w-full h-screen bg-black bg-opacity-70 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}
        style={{ zIndex: 10 }}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleToggle} className="text-white text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-10 text-white">
          <li className="content-center">
            <Link href="/contact" className="relative group">
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </li>
          {user && (
            <li className="content-center">
              <Link href="/dashboard" className="relative group">
                Dashboard
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <button
                onClick={handlgeSignOut}
                className="flex w-full justify-center rounded-md bg-[#1e40af] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4CAF50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign out
              </button>
            ) : (
              <Link href="/login" className="flex w-full justify-center rounded-md bg-[#1e40af] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4CAF50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Menú horizontal (visible en pantallas grandes) */}
      <ul className="hidden lg:flex space-x-4 mr-6" style={{ justifyContent: 'right' }}>
        <li className="content-center">
          <Link href="/contact" className="text-white relative group">
            Contact
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </li>
        {user && (
          <li className="content-center">
            <Link href="/dashboard" className="text-white relative group">
              Dashboard
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <button
              onClick={handlgeSignOut}
              className="flex w-full justify-center rounded-md bg-[#1e40af] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4CAF50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="flex w-full justify-center rounded-md bg-[#1e40af] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4CAF50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
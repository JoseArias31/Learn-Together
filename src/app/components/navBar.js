"use client";

import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import logo from "../../../public/logoNB.png";
import { getUser } from "../auth/register/keepLogginIn";
import { signOutUser } from "../auth/register/signOut";
import { useEffect, useState } from "react";

import { LaptopMinimalCheck, BookOpenCheck } from "lucide-react";

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
    <nav className="relative p-4 flex justify-between items-center !bg-black">
      <div className="flex items-center gap-4">
        <Image className="relative z-10" src={logo} alt="Logo" width={41} />
        <a href="/">
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
        </a>
      </div>

      {/* Icono de toggle en dispositivos móviles */}
      <div className="lg:hidden flex items-center">
  {/* Botón para abrir el menú */}
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
  className={`fixed top-0 right-0 w-full h-screen bg-black bg-opacity-95 transition-all duration-300 ease-in-out ${
    menuOpen ? "translate-x-0" : "translate-x-full"
  }`}
  style={{ zIndex: 1000 }}
>
  {/* Botón para cerrar el menú */}
  <div className="flex justify-end p-6">
    <button onClick={handleToggle} className="text-white text-3xl hover:text-gray-300 transition-colors duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-8 h-8"
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

  {/* Lista de enlaces */}
  <ul className="flex flex-col items-center space-y-8 mt-16 text-white">
    <li className="content-center">
      <Link href="/" className="relative group text-xl font-light hover:font-normal transition-all duration-200">
        Home
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
      </Link>
    </li>
    <li className="content-center">
      <Link href="/programs" className="relative group text-xl font-light hover:font-normal transition-all duration-200">
        Programs
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
      </Link>
    </li>
    <li className="content-center">
      <Link href="/courses" className="relative group text-xl font-light hover:font-normal transition-all duration-200">
        Courses
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
      </Link>
    </li>
    <li className="content-center">
      <Link href="/contact" className="relative group text-xl font-light hover:font-normal transition-all duration-200">
        Contact
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
      </Link>
    </li>
    {user && (
      <li className="content-center">
        <Link href="/dashboard" className="relative group text-xl font-light hover:font-normal transition-all duration-200">
          Dashboard
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
        </Link>
      </li>
    )}
    <li className="mt-8">
      {user ? (
        <button
          onClick={handlgeSignOut}
          className="flex w-full justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Sign out
        </button>
      ) : (
        <Link
          href="/login"
          className="flex w-full justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Sign in
        </Link>
      )}
    </li>
  </ul>
</div>

      {/* Menú horizontal (visible en pantallas grandes) */}

      <ul className="flex hidden lg:flex gap-10">
        <li className="content-center z-10 text-white">
          <Link href="/programs" className="text-white relative group flex gap-2">
            <LaptopMinimalCheck /> {/* Icono primero */}
            Programs {/* Texto después */}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </li>
        <li className="content-center z-10 text-white">
          <Link href="/courses" className="text-white relative group flex gap-2">
            <BookOpenCheck /> {/* Icono primero */}
            Courses {/* Texto después */}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </li>
      </ul>

      <ul
        className="hidden lg:flex space-x-4 mr-6"
        style={{ justifyContent: "right" }}
      >
        <li className="content-center">
          <Link href="/" className="text-white relative group">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </li>
        
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
            <Link
              href="/login"
              className="flex w-full justify-center rounded-md bg-[#1e40af] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4CAF50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

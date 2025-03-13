"use client";

import Link from "next/link";
import useCharts from "../../scripts/dashboard/useCharts";
import useSidebarToggle from "../../scripts/dashboard/useSidebarToggle";
import Image from "next/image";
import logo from "../../../public/logoNB.png";
import ImageCarousel from "../components/ProgramCarousel";
import CategoryCarousel from "../components/CategoryCarousel";
import Footer from "../components/footer";
import home from "../../../public/home.png";
import ai from "../../../public/ai.png";
import programs from "../../../public/programs.png";
import settings from "../../../public/settings.png";
import VoiceInteraction from "../components/VoiceInteraction";
import { AutoChangingText } from "../components/autoChangingText";
import useProtectedRoute from "../auth/register/Hooks/useProtectedRoutes";
import { useState } from "react";

const Dashboard = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebarToggle();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useCharts();
  const session = useProtectedRoute();

  if (!session) {
    return <p>Redirecting to login...</p>;
  }

  // Auto Changing Text loop

  return (
    <div className="bg-custom-gradient text-gray-100 overflow-x-clip">
      {/* Header Section */}

      {/* Main Content*/}

      <div className="bg-custom-gradient text-gray-100 overflow-x-clip min-h-screen flex">
        <aside
          id="sidebar"
          className="hidden md:flex sticky top-0 h-screen w-64 bg-gray-800 p-4 flex-col justify-between"
        >
          <div className="flex flex-col items-center gap-2">
            <button
              id="menuButton"
              className="text-gray-100 text-3xl lg:hidden hover:text-gray-400"
              aria-label="Open Menu"
            >
              <i className="bx bx-menu"></i>
            </button>

            <section className="flex flex-row p-4 justify-end gap-4 rounded-lg ">
              <div className="relative flex flex-col items-center gap-3">
                {/* Foto de perfil redonda */}
                <Image
                  src="/profilePicture.png"
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300"
                />

                <h2 className="flex items-center px-4 py-2 text-white bg-gray-800  gap-2 shadow-md border-b ">
                  Hello, {session.user.email.replace(/@[^@]+$/, "")}
                </h2>

                {/* Menú desplegable corregido */}

                <div className=" top-full right-0  p-4  shadow-md w-64 z-10  mt-2">
                  
                  <div className="flex flex-col gap-2">
                    
                    <div className="flex flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Account Status
                      </h2>
                      <h3 className=" text-sm text-green-600 font-semibold">
                        Active
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Membership
                      </h2>
                      <h3 className="text-sm text-blue-600 font-semibold">
                        Student
                      </h3>
                    </div>
                    <div className="flex  flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Subscription
                      </h2>
                      <h3 className="text-sm text-purple-600 font-semibold">
                        Monthly
                      </h3>
                    </div>
                    <div className="flex  flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Programs Completed
                      </h2>
                      <h3 className="text-sm text-yellow-600 font-semibold">
                        2
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Add a new Program
                      </h2>
                      <Link href="/programs">
                        <div className="hover:scale-110 transition duration-300 flex justify-center  ">
                          <Image
                            src="/add sign.png"
                            alt="add simbol"
                            width={20}
                            height={30}
                            className="filter invert brightness-0"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <nav className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-home-alt text-teal-400"></i>
              <Image src={home} alt="home" width={20} />
              <span className="text-xs sm:text-xs md:text-xs lg:text-base">
                Home
              </span>
            </Link>
            <Link
              href="/programs"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-line-chart text-teal-400"></i>

              <Image src={programs} alt="programs" width={20} />
              <span className="text-xs sm:text-xs md:text-xs lg:text-base">
                My Programs
              </span>
            </Link>
            <Link
              href="/ai-assistance"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-wallet text-teal-400"></i>

              <Image src={ai} alt="aiAssistance" width={20} />
              <span className="text-xs sm:text-xs md:text-xs lg:text-base">
                AI Assistance
              </span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
            >
              <i className="bx bx-cog text-teal-400"></i>

              <Image src={settings} alt="settings" width={20} />
              <span className="text-xs sm:text-xs md:text-xs lg:text-base">
                Settings
              </span>
            </Link>
          </nav>
          <h2 className="w-full text-center text-xs">Empowered by AI</h2>
        </aside>

        {/* Top Content */}

        <div className="w-full">
          <div className=" flex items-center justify-center">
            <div className="text-center mt-20">
              <AutoChangingText />
              <h1 className="mt-2 ml-4 mr-4 text-sm">
                Type your preferable interests to build a route map
              </h1>
            </div>
          </div>
         {/* Agregar Toggle*/}

          <section className="md:hidden absolute top-0 left-0 flex flex-row p-2 justify-end gap-4 rounded-lg">
 <div className="relative flex flex-col   ">
  {/* Foto de perfil redonda */}
  <Image
    src="/profilePicture.png"
    alt="Profile Picture"
    width={40}
    height={40}
    className="rounded-full border-2 border-gray-300"
  />

<button
  onClick={() => setIsOpen(!isOpen)}
  className="flex justify-between text-xs items-center px-4 py-2 text-white bg-gray-800 rounded-md gap-2 shadow-md hover:bg-gray-700 transition min-w-[150px]"
>
  Hello, {session.user.email.replace(/@[^@]+$/, "")}
  <Image
    src="/arrowDown.png"
    alt="Dropdown Icon"
    width={20}
    height={20}
  />
</button>

  {/* Menú desplegable corregido */}
  {isOpen && (
    <div className=" flex flex-col justify-evenly  top-full right-0  p-2 rounded-lg shadow-md  z-10 w-64 h-80  bg-gray-300 ">
      <ul className=" items-center space-y-2 text-white " style={{placeItems: "start"}}>
   <li className="content-center">
     <Link
       href="/"
       className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
     >
       <i className="bx bx-home-alt text-teal-400 "></i>
       <Image src={home} alt="home" width={15} />
       <span className="text-sm text-black">Home</span>
     </Link>
   </li>
   <li className="content-center">
     <Link
       href="/programs"
       className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
     >
       <i className="bx bx-line-chart text-teal-400"></i>

       <Image src={programs} alt="programs" width={15} />
       <span className="text-sm text-black">My Programs</span>
     </Link>
   </li>
   <li className="content-center">
     <Link
       href="/ai-assistance"
       className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
     >
       <i className="bx bx-wallet text-teal-400"></i>

       <Image src={ai} alt="aiAssistance" width={15} />
       <span className="text-sm text-black">AI Assistance</span>
     </Link>
   </li>
   <li className="content-center">
     <Link
       href="/settings"
       className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
     >
       <i className="bx bx-cog text-teal-400"></i>

       <Image src={settings} alt="settings" width={15} />
       <span className="text-sm text-black">Settings</span>
     </Link>
   </li>

   <li className="mt-8"></li>
 </ul>
      <div className="flex flex-col gap-3 m-2 border-t border-black mt-2">
        <div className="flex flex-row justify-between mt-4">
          <h2 className=" text-xs font-medium text-gray-800">
            Account Status
          </h2>
          <h3 className=" text-xs text-green-600 font-semibold">
            Active
          </h3>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className=" text-xs font-medium text-gray-800">
            Membership
          </h2>
          <h3 className="text-xs text-blue-600 font-semibold">
            Student
          </h3>
        </div>
        <div className="flex  flex-row justify-between">
          <h2 className=" text-xs font-medium text-gray-800">
            Subscription
          </h2>
          <h3 className="text-xs text-purple-600 font-semibold">
            Monthly
          </h3>
        </div>
        <div className="flex  flex-row justify-between">
          <h2 className=" text-xs font-medium text-gray-800">
            Programs Completed
          </h2>
          <h3 className="text-xs text-yellow-600 font-semibold">
            2
          </h3>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className=" text-xs font-medium text-gray-800">
            Add a new Program
          </h2>
          <Link href="/programs">
            <div className="hover:scale-110 transition duration-300 flex justify-center  ">
              <Image
                src="/add sign.png"
                alt="add simbol"
                width={20}
                height={30}
                className="filter invert brightness-1"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

</section>
          <div
            className="flex  absolute top-0 right-0 items-center  text-teal-400 cursor-pointer items-center flex-col mr-4 "
            style={{ textAlignLast: "center" }}
          >
            <a href="/">
              <Image
                className="relative z-10"
                src={logo}
                alt="Logo"
                width={50}
              />
            </a>
            <h1
              className="text-white font-bold text-base sm:text-lg md:text-2xl font-sans tracking-wide "
              style={{
                background: "linear-gradient(to right, #4CAF50, #1E90FF)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Learn Together
            </h1>
          </div>
          <div className="justify-items-center mb-14">
            <h1 className="text-center font-sans mt-8 text-4xl md:text-5xl xl:text-6xl">
              Unlock the Future
            </h1>
            <h1 className="text-center mb-8 text-4xl md:text-5xl xl:text-7xl text-green-400">
              Your AI Learning Hub
            </h1>
            <div>
              <VoiceInteraction />
            </div>
          </div>

          <div className="flex p-3 gap-4 bg-custom-gradient ">
            {/* Sidebar Section */}

            {/* Main Section */}
            <main className="flex-1 bg-custom-gradient flex gap-4 flex-col lg:flex-row ml-0 lg:ml-42">
              <section className="w-full lg:flex-1 p-4 space-y-6 bg-gray-800 flex flex-col rounded-lg justify-evenly">
                <ImageCarousel />
                <CategoryCarousel />

                <div className="flex gap-4 flex-col md:flex-row">
                  {/* Income Card */}
                  <div className="bg-gray-700 p-5 flex-1 rounded-md flex items-center justify-between">
                    <div className="flex md:items-center gap-2 flex-col lg:flex-row items-start">
                      <i className="bx bx-dollar-circle text-teal-400 text-2xl"></i>
                      <h2 className="text-sm md:text-lg font-semibold text-gray-100">
                        Total Categories
                      </h2>
                    </div>
                    <div className="text-xl font-bold text-gray-100 flex flex-col items-end lg:flex-row lg:items-center gap-2">
                      <span className="text-green-400 text-sm">10</span>
                    </div>
                  </div>

                  {/* Expense Card */}
                  <div className="bg-gray-700 p-4 md:p-5 flex-1 rounded-md flex items-center justify-between">
                    <div className="flex md:items-center gap-2 flex-col lg:flex-row items-start">
                      <i className="bx bx-cart text-teal-400 text-2xl"></i>
                      <h2 className="text-sm md:text-lg font-semibold text-gray-100">
                        Total Programs
                      </h2>
                    </div>
                    <div className="text-xl font-bold text-gray-100 flex flex-col items-end lg:flex-row lg:items-center gap-2">
                      <span className="text-green-400 text-sm">50</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right Side Content */}
            </main>
          </div>

          <div className="flex items-center flex-col mt-14 mb-20 ">
            <div className="flex flex-col text-center relative gap-4 hidden lg:flex w-[600px] items-center">
              <h1 className="text-4xl">
                It is time for AI to give you a hand{" "}
              </h1>
              <h1>Ask it anything to figure it out best program for you!</h1>
              <textarea
                placeholder="What should I study?"
                className="border-green-400 w-[400px] content-center py-2 pl-10 pr-4 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;






//  {/* Icono de toggle en dispositivos móviles */}
//  <div className="absolute top-0 m-4 md:hidden flex items-center ">
//  {/* Botón para abrir el menú */}
//  <button onClick={handleToggle} className="text-white">
//    <svg
//      xmlns="http://www.w3.org/2000/svg"
//      fill="none"
//      viewBox="0 0 24 24"
//      stroke="currentColor"
//      className="w-6 h-6"
//    >
//      <path
//        strokeLinecap="round"
//        strokeLinejoin="round"
//        strokeWidth="2"
//        d="M4 6h16M4 12h16M4 18h16"
//      />
//    </svg>
//  </button>
// </div>
// {/* Menú desplegable - se superpone en móviles */}
// <div
//  className={`fixed top-0 right-0 rounded w-full h-full bg-black bg-opacity-95 transition-all duration-300 ease-in-out ${
//    menuOpen ? "translate-x-0" : "translate-x-full"
//  }`}
//  style={{ zIndex: 1000 }}
// >
//  {/* Botón para cerrar el menú */}
//  <div className="flex justify-end p-6">
//    <button
//      onClick={handleToggle}
//      className="text-white text-3xl hover:text-gray-300 transition-colors duration-200"
//    >
//      <svg
//        xmlns="http://www.w3.org/2000/svg"
//        fill="none"
//        viewBox="0 0 24 24"
//        stroke="currentColor"
//        className="w-8 h-8"
//      >
//        <path
//          strokeLinecap="round"
//          strokeLinejoin="round"
//          strokeWidth="2"
//          d="M6 18L18 6M6 6l12 12"
//        />
//      </svg>
//    </button>
//  </div>

//  {/* Lista de enlaces */}
//  <ul className="flex flex-col items-center space-y-8 mt-16 text-white">
//    <li className="content-center">
//      <Link
//        href="/"
//        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
//      >
//        <i className="bx bx-home-alt text-teal-400"></i>
//        <Image src={home} alt="home" width={20} />
//        <span className="text-base">Home</span>
//      </Link>
//    </li>
//    <li className="content-center">
//      <Link
//        href="/programs"
//        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
//      >
//        <i className="bx bx-line-chart text-teal-400"></i>

//        <Image src={programs} alt="programs" width={20} />
//        <span className="text-base">My Programs</span>
//      </Link>
//    </li>
//    <li className="content-center">
//      <Link
//        href="/ai-assistance"
//        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
//      >
//        <i className="bx bx-wallet text-teal-400"></i>

//        <Image src={ai} alt="aiAssistance" width={20} />
//        <span className="text-base">AI Assistance</span>
//      </Link>
//    </li>
//    <li className="content-center">
//      <Link
//        href="/settings"
//        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 p-3 rounded-md"
//      >
//        <i className="bx bx-cog text-teal-400"></i>

//        <Image src={settings} alt="settings" width={20} />
//        <span className="text-base ">Settings</span>
//      </Link>
//    </li>

//    <li className="mt-8"></li>
//  </ul>
// </div>
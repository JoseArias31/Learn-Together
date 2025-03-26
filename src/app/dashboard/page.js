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
import { useState, useEffect } from "react";
import {signOutUser} from "../auth/register/signOut";
import { supabase } from "../lib/supabaseClient";


const Dashboard = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebarToggle();

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useCharts();
  const session = useProtectedRoute();

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!session?.user?.id) return;

      try {
        // Fetch enrolled programs with their details
        const { data: programsData, error: programsError } = await supabase
          .from('enrollments')
          .select(`
            enrollment_id:id,
            enrolled_at,
            program:programs!program_id(
              programid,
              programname,
              description
            )
          `)
          .eq('user_id', session.user.id)
          .not('program_id', 'is', null);

        if (programsError) throw programsError;

        // Fetch enrolled courses with their details
        const { data: coursesData, error: coursesError } = await supabase
          .from('enrollments')
          .select(`
            enrollment_id:id,
            enrolled_at,
            course:courses!course_id(
              courseid,
              coursename,
              description
            )
          `)
          .eq('user_id', session.user.id)
          .not('course_id', 'is', null);

        if (coursesError) throw coursesError;

        // Extract program and course data with enrollment IDs
        const uniquePrograms = programsData
          .map(item => ({
            ...item.program,
            enrolled_at: item.enrolled_at,
            enrollment_id: item.enrollment_id
          }))
          .filter(program => program !== null);
        
        const uniqueCourses = coursesData
          .map(item => ({
            ...item.course,
            enrolled_at: item.enrolled_at,
            enrollment_id: item.enrollment_id
          }))
          .filter(course => course !== null);

        setEnrolledPrograms(uniquePrograms);
        setEnrolledCourses(uniqueCourses);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [session]);


  if (!session) {
    return <p>Redirecting to login...</p>;
  }


  const handlgeSignOut = async () => {
    const { success, error } = await signOutUser();
    if (success) {
      setUser(null); // Actualiza el estado para reflejar que el usuario no está loggeado
    } else {
      console.log("Error signing out:", error);
    }
  };
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

                <div className=" top-full right-0 border-b p-4  shadow-md w-64 z-10  mt-2">
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
                    {enrolledCourses.length > 0 ? (
  <div className="flex flex-row justify-between">
    <h2 className="text-white text-sm font-medium text-gray-800">
      Current Courses
    </h2>
    <h3 className="text-sm font-semibold">
      {enrolledCourses.length}
    </h3>
  </div>
) : (
  <div className="flex flex-row justify-between">
    <h2 className="text-white text-sm font-medium text-gray-800">
      Current Courses
    </h2>
    <h3 className="text-sm font-semibold">
      0
    </h3>
  </div>
)}


                    <div className="flex  flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Courses Completed
                      </h2>
                      <h3 className="text-sm  font-semibold">2</h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Add a new Course
                      </h2>
                      <Link href="/courses">
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
                    {(() => {
  // Filter out duplicate programs based on programid
  const uniquePrograms = enrolledPrograms.filter(
    (program, index, self) => 
      index === self.findIndex((p) => (
        p.programid === program.programid
      ))
  );

  return uniquePrograms.length > 0 ? (
    <div className="flex flex-row justify-between">
      <h2 className="text-white text-sm font-medium text-gray-800">
        Current Programs
      </h2>
      <h3 className="text-sm font-semibold">
        {uniquePrograms.length}
      </h3>
    </div>
  ) : (
    <div className="flex flex-row justify-between">
      <h2 className="text-white text-sm font-medium text-gray-800">
        Current Programs
      </h2>
      <h3 className="text-sm font-semibold">
        0
      </h3>
    </div>
  );
})()}
                 
                    <div className="flex  flex-row justify-between">
                      <h2 className="text-white text-sm font-medium text-gray-800">
                        Programs Completed
                      </h2>
                      <h3 className="text-sm  font-semibold">
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
            <button
              onClick={handlgeSignOut}
              className="flex cursor-pointer flex items-center text-gray-800 bg-green-500 hover:bg-blue-700  self-center p-2  rounded-md justify-self-center"
            >
              <Link
                href="/"
                className="flex items-center space-x-3 text-gray-300  rounded-md justify-center"
              >
                <span className="h-full  text-xs sm:text-xs md:text-xs  text-black font-semibold">
                  Sign Out
                </span>
              </Link>
            </button>
          </nav>

          <div className="flex space-x-4 justify-center">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
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

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between text-xs items-center px-4 py-2 text-white bg-gray-800 rounded-md gap-2 shadow-md hover:bg-gray-700 transition min-w-[150px]"
              >
                Hello, {session.user.email.replace(/@[^@]+$/, "")}
                <Image
                  src="/profilePicture.png"
                  alt="Profile Picture"
                  width={20}
                  height={40}
                  className=" rounded-full border-2 border-gray-300"
                />
                <Image
                  src="/arrowDown.png"
                  alt="Dropdown Icon"
                  width={20}
                  height={20}
                />
              </button>

              {/* Menú desplegable corregido */}
              {isOpen && (
                <div className=" flex flex-col justify-evenly  top-full right-0  p-2 rounded-lg shadow-md  z-10 w-64 h-100  bg-gray-300 ">
                  <ul
                    className=" items-center space-y-2 text-white "
                    style={{ placeItems: "start" }}
                  >
                    <li className="content-center">
                      <Link
                        href="/"
                        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
                      >
                        <i className="bx bx-home-alt text-teal-400 "></i>
                        <Image src={home} alt="home" width={15} />
                        <span className="text-sm text-black font-bold">
                          Home
                        </span>
                      </Link>
                    </li>
                    <li className="content-center">
                      <Link
                        href="/programs"
                        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
                      >
                        <i className="bx bx-line-chart text-teal-400"></i>

                        <Image src={programs} alt="programs" width={15} />
                        <span className="text-sm text-black font-bold">
                          My Programs
                        </span>
                      </Link>
                    </li>
                    <li className="content-center">
                      <Link
                        href="/ai-assistance"
                        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
                      >
                        <i className="bx bx-wallet text-teal-400"></i>

                        <Image src={ai} alt="aiAssistance" width={15} />
                        <span className="text-sm text-black font-bold">
                          AI Assistance
                        </span>
                      </Link>
                    </li>
                    <li className="content-center">
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 mt-2 rounded-md"
                      >
                        <i className="bx bx-cog text-teal-400"></i>

                        <Image src={settings} alt="settings" width={15} />
                        <span className="text-sm text-black font-bold">
                          Settings
                        </span>
                      </Link>
                    </li>

                    <li className="mt-8"></li>
                  </ul>
                  <div className="flex flex-col gap-3 m-2 border-t border-black mt-2">
                    <div className="flex flex-row justify-between mt-4">
                      <h2 className=" text-xs font-bold text-gray-800">
                        Account Status
                      </h2>
                      <h3 className=" text-xs text-green-600 font-semibold">
                        Active
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className=" text-xs font-bold text-gray-800">
                        Membership
                      </h2>
                      <h3 className="text-xs text-blue-600 font-semibold">
                        Student
                      </h3>
                    </div>
                    <div className="flex  flex-row justify-between">
                      <h2 className=" text-xs font-bold text-gray-800">
                        Subscription
                      </h2>
                      <h3 className="text-xs text-purple-600 font-semibold">
                        Monthly
                      </h3>
                    </div>
                    {enrolledCourses.length > 0 ? (
  <div className="flex flex-row justify-between">
    <h2 className="text-xs font-bold text-gray-800">
      Current Courses
    </h2>
    <h3 className="text-xs text-yellow-600 ">
      {enrolledCourses.length}
    </h3>
  </div>
) : (
  <div className="flex flex-row justify-between">
    <h2 className="text-black text-sm font-medium text-gray-800">
      Current Courses
    </h2>
    <h3 className="text-sm font-semibold">
      0
    </h3>
  </div>
)}
                    <div className="flex  flex-row justify-between">
                      <h2 className=" text-xs font-bold text-gray-800">
                        Courses Completed
                      </h2>
                      <h3 className="text-xs text-yellow-600 font-semibold">
                        2
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className=" text-xs  font-bold text-gray-800">
                        Add a new Course
                      </h2>
                      <Link href="/courses">
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
                    {(() => {
  // Filter out duplicate programs based on programid
  const uniquePrograms = enrolledPrograms.filter(
    (program, index, self) => 
      index === self.findIndex((p) => (
        p.programid === program.programid
      ))
  );

  return uniquePrograms.length > 0 ? (
    <div className="flex flex-row justify-between">
      <h2 className="text-xs font-bold text-gray-800">
        Current Programs
      </h2>
      <h3 className="text-sm text-yellow-600">
        {uniquePrograms.length}
      </h3>
    </div>
  ) : (
    <div className="flex flex-row justify-between">
      <h2 className="text-xs font-bold text-gray-800">
        Current Programs
      </h2>
      <h3 className="text-sm font-semibold">
        0
      </h3>
    </div>
  );
})()}
                 
                    <div className="flex  flex-row justify-between">
                      <h2 className=" text-xs font-bold text-gray-800">
                        Programs Completed
                      </h2>
                      <h3 className="text-xs text-yellow-600 font-semibold">
                        2
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between">
                      <h2 className=" text-xs  font-bold text-gray-800">
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

                    <button
                      onClick={handlgeSignOut}
                      className="flex cursor-pointer flex items-center text-gray-800 bg-green-500 hover:bg-gray-700  self-center p-2  rounded-md justify-center"
                    >
                      <Link
                        href="/"
                        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 rounded-md justify-center"
                      >
                        <span className="h-full text-xs text-black font-semibold">
                          Sign Out
                        </span>
                      </Link>
                    </button>
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
            <h1 className="text-center font-sans mt-8 text-4xl md:text-5xl">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                    {/* Current Programs Section */}
                  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Programs Enrolled</h2>
                      <Link href="/programs">
                        <div className="hover:scale-110 transition duration-300 bg-gray-700 rounded-full p-2">
                          <Image
                            src="/add sign.png"
                            alt="Add Program"
                            width={20}
                            height={20}
                            className="filter invert brightness-0"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {loading ? (
  <p>Loading your programs...</p>
) : enrolledPrograms.length > 0 ? (
  (() => {
    // Store unique program names
    const uniquePrograms = new Map();
    const uniqueCourses = [];

    enrolledPrograms.forEach((item) => {
      if (item.programname) {
        uniquePrograms.set(item.programname, item); // Store only unique program names
      } else {
        uniqueCourses.push(item); // Store all courses
      }
    });

    return [...uniquePrograms.values(), ...uniqueCourses].map((item) => (
      <div key={item.enrollment_id} className="bg-gray-700 rounded-lg p-1 pr-2 pl-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-sm">{item.programname || item.coursename}</h3>
            <p className="text-xs text-gray-400">
              Enrolled: {new Date(item.enrolled_at).toLocaleDateString()}
            </p>
          </div>
          <div className="w-20 h-2 bg-gray-600 rounded-full">
            <div className="w-1/3 h-full bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>
    ));
  })()
) : (
  <p className="text-gray-400">
    No programs enrolled yet.{" "}
    <Link href="/programs" className="text-blue-400 hover:text-blue-300">
      Browse programs
    </Link>
  </p>
)}


                    </div>
                  </div>
                  {/* Current Courses Section */}
                  <div className="bg-gray-800 rounded-lg p-6 shadow-lg ">
                    <div className="flex justify-between items-center mb-4 ">
                      <h2 className="text-xl font-semibold">Courses Enrolled</h2>
                      <Link href="/courses">
                        <div className="hover:scale-110 transition duration-300 bg-gray-700 rounded-full p-2">
                          <Image
                            src="/add sign.png"
                            alt="Add Course"
                            width={20}
                            height={20}
                            className="filter invert brightness-0"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
                      {loading ? (
                        <p>Loading your courses...</p>
                      ) : enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course) => (
                          <div key={course.enrollment_id} className="bg-gray-700 rounded-lg p-1 pr-2 pl-2 ">
                            <div className="flex justify-between items-center ">
                              <div>
                                <h3 className="font-medium text-xs ">{course.coursename}</h3>
                                <p className="text-xs text-gray-400">
                                  Enrolled: {new Date(course.enrolled_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="w-20 h-2 bg-gray-600 rounded-full">
                                <div className="w-1/2 h-full bg-teal-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          No courses enrolled yet.{" "}
                          <Link href="/courses" className="text-blue-400 hover:text-blue-300">
                            Browse courses
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>

               
                </div>
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

          <div className="flex items-center flex-col mt-14 mb-20">
            <div className="flex flex-col text-center relative gap-4  w-[300px] md:w-[550px] lg:w-[800px] items-center">
              <h1 className="text-3xl md:text-4xl">
                It is time for AI to give you a hand
              </h1>
              <h1 className="text-lg md:text-xl">
                Ask it anything to figure out the best program for you!
              </h1>
              <textarea
                placeholder="What should I study?"
                className="border-green-400 w-full md:w-[400px] content-center py-2 pl-10 pr-4 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;



function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
"use client";

import NavBar from "./components/navBar";
import Footer from "./components/footer";
import MainButton from "./components/MainBotton";
import WebDevelopmentPrograms from "./components/Cards";
import SecondaryButton from "./components/SecondaryBotton";
import CourseCards from "./components/CourseCards";
import ThirdButton from "./components/ThirdBotton";
import dynamic from "next/dynamic";
import { AutoChangingText } from "./components/autoChangingText";
import { getUser } from "./auth/register/keepLogginIn";
import { useEffect, useState } from "react";
import useProtectedRoute from "./auth/register/Hooks/useProtectedRoutes";

function Home() {


const session = useProtectedRoute();


  return (
    <div className="absolute text-white m-0 p-0 top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <NavBar />
      {session ? (
        <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
          <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
            Welcome back, {session.user.email.replace(/@[^@]+$/, "")}!
          </h1>
        </div> ): ( <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
          <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
            Welcome to Learn Together!
          </h1> 
        </div> )}
      <h1 className="text-center mt-10 sm:mt-16 md:mt-20 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4 sm:px-6">
        Choose literally any program and unlock your potential
      </h1>
      <div className="flex justify-center mt-5">
        <AutoChangingText />
      </div>
      <div className="mt-10">
        <h2 className="text-center font-kodchasan text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl mb-2 ">
          Get help with AI assistance anytime, anywhere
        </h2>

        {/* <h2 className="text-center font-kodchasan text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl">
          Don’t believe it? Try it yourself by clicking on the chat icon.
        </h2> */}
      </div>

      <MainButton />
      <h1 className="text-center mt-10 text-4xl sm:text-5xl md:text-6xl font-kodchasan ">
        Explore Programs
      </h1>

      <h2 className="text-center font-kodchasan mt-3 md:mt-4 px-4 sm:px-8 mb-6">
        <strong>Learn Together</strong> offers a wide range of educational
        programs to help you achieve your goals.
      </h2>

      <WebDevelopmentPrograms />
      <SecondaryButton />
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
      <h1 className="text-center mt-10 text-4xl sm:text-5xl md:text-6xl font-kodchasan">
        Feature Courses
      </h1>
      <h2 className="text-center font-kodchasan mt-3 md:mt-4 px-4 sm:px-8 mb-6">
        Explore our wide range of courses and find the perfect one for you.
      </h2>

      <CourseCards />
      <ThirdButton />
      <Footer />
    </div>
  );
}

// Export the Home component wrapped with dynamic
export default dynamic(() => Promise.resolve(Home), { ssr: false });

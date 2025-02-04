'use client';

import NavBar from "./components/navBar";
import Footer from "./components/footer";
import MainButton from "./components/MainBotton";
import WebDevelopmentPrograms from "./components/Cards";
import SecondaryButton from "./components/SecondaryBotton";
import CourseCards from "./components/CourseCards";
import ThirdButton from "./components/ThirdBotton";
import dynamic from "next/dynamic";
import { AutoChangingText } from "./components/autoChangingText";

function Home() {
  return (
    <div className="absolute text-white m-0 p-0 top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <NavBar />
      <h1 className="text-center mt-10 sm:mt-16 md:mt-20 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-4 sm:px-6">
  Choose literally any program and unlock your potential like this website
</h1>
<div className="flex justify-center mt-5">
<AutoChangingText />
</div>
      <div className="mt-10">
        <h2 className="text-center font-kodchasan text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl mb-2">
          You can get help with AI assistance anytime, anywhere
        </h2>

        {/* <h2 className="text-center font-kodchasan text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl">
          Don’t believe it? Try it yourself by clicking on the chat icon.
        </h2> */}
      </div>

      <MainButton />
      <h1 className="text-start mt-10 text-4xl sm:text-5xl md:text-6xl font-kodchasan ml-5 sm:ml-10 md:ml-20">
  Explore
</h1>

<h2 className="text-start font-kodchasan mt-3 md:mt-4 px-4 sm:px-8 mb-6">
  <strong>Learn Together</strong> offers a wide range of educational programs to help you achieve your goals.
</h2>


      <WebDevelopmentPrograms />
      <SecondaryButton />
      <h1 className="text-center mt-10 text-4xl sm:text-5xl md:text-6xl font-kodchasan">
  Feature Courses
</h1>
<h2 className="text-center font-kodchasan mt-3 md:mt-4 px-4 sm:px-8">
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
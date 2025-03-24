"use client";

import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { SearchProgram } from "../components/searchProgram";
import useProtectedRoute from "../auth/register/Hooks/useProtectedRoutes";

export default function Programs() {
  const session = useProtectedRoute();

  const fetchPrograms = async () => {
    const { data: programs, error } = await supabase.from("programs").select("*");
    if (error) {
      console.log("Error getting programs:", error);
      return null;
    }
    return programs;
  };

  const programs = fetchPrograms();
  if (!programs) {
    return <div>Error loading programs</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
  <NavBar />
  <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex-grow">
    {session ? (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base font-semibold">
          Hi, {session.user.email.replace(/@[^@]+$/, "")}!
        </h1>
      </div>
    ) : (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
          Welcome to Learn Together! Please log in to access your programs.
        </h1>
      </div>
    )}
    
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Programs
      </h1>
      <p className="text-center">
        Choose a program that aligns with your goals and start building your future today.
      </p>
      

      <SearchProgram />
    </div>
  </div>
  <Footer />
</div>
  );
}



import { supabase } from "../lib/supabaseClient";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Link from "next/link";
import {SearchCourse} from "../components/searchCourse";

export default async function courses() {
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    console.log("Error getting courses:", error);
    <div>Error loading Courses</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
  <NavBar />
  <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex-grow">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Courses
      </h1>
      <p className="text-center text-gray-600">
        Choose a Course that aligns with your goals and start building your future today.
      </p>
      <SearchCourse />
    </div>
  </div>
  <Footer />
</div>
  );
}

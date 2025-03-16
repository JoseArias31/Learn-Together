/* eslint-disable react/prop-types */
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { supabase } from "src/app/lib/supabaseClient";
import Notebook from "src/app/components/notebook";
import { BookOpen, Clock, GraduationCap, BookOpenText } from "lucide-react";

export default async function CoursePage({ params }) {
        let coursename = decodeURIComponent(params.coursename); // Decodifica caracteres especiales
    coursename = coursename.replace(/-/g, " ");

    console.log("Fetching course:", coursename); // Debug: Check the course name

    // Fetch the course by name
    const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("coursename", coursename)
        .single() // Assuming `coursename` is unique

    console.log("Course Data:", courseData); // Debug: Check the fetched data
    console.log("Course Error:", courseError); // Debug: Check for errors

    if (courseError) {
        console.error(`Error fetching course: ${courseError.message}`);
        return <div>Error loading course. Please try again later.</div>;
    }

    if (!courseData) {
        return <div>Course not found.</div>;
    }

    return (
        <div>
          <NavBar />
            <h1 className="mx-20  mt-6 text-3xl font-bold mb-6 capitalize">{courseData.coursename}</h1>

            <div
          className="rounded mx-28"
          style={{ backgroundColor: "#80808045", padding: "15px" }}
        >
          <h2 className="mb-2 font-bold">Program Overview</h2>
          <p className="text-gray-600 mb-4">{courseData.fulldescription}</p>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
              <div className="flex items-center font-bold ">
                <BookOpen className="mr-2" />
                <span>{courseData.length} Courses</span>
              </div>
              <div className="flex items-center font-bold">
                <Clock className="mr-2" />
                <span>{courseData.duration} Program</span>
              </div>
              <div className="flex items-center font-bold">
                <GraduationCap className="mr-2" />
                <span>{courseData.description}</span>
              </div>
            </div>
          </div>
        </div>

           <div className="flex flex-row justify-between mt-10"> 
            <div className="w-full">
            <h1 className="bg-blue">Course Content</h1>
            </div>
            <div className="w-1/4 hidden md:flex">
            <Notebook />
            </div>
           </div>
            <Footer />
        </div>
    );
}
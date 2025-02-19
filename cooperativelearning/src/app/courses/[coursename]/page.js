/* eslint-disable react/prop-types */
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { supabase } from "src/app/lib/supabaseClient";

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
            <h1>{courseData.coursename}</h1>
            <h1>{courseData.duration}</h1>
            <h1>{courseData.description}</h1>
            <Footer />
        </div>
    );
}
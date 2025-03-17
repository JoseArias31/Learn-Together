"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "src/app/lib/supabaseClient";

export default function CoursePage({ params }) {
    const { coursename } = use(params) || { coursename: "" };
    const [courseData, setCourseData] = useState(null);
    const [moduleData, setModuleData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Decodifica el nombre del curso
                const decodedCoursename = decodeURIComponent(coursename).replace(/-/g, " ");

                // Fetch the course by name
                const { data: course, error: courseError } = await supabase
                    .from("courses")
                    .select("*")
                    .eq("coursename", decodedCoursename)
                    .single();

                if (courseError) throw courseError;

                setCourseData(course);

                // Fetch modules for the course
                if (course) {
                    const { data: modulesData, error: modulesError } = await supabase
                        .from("modules")
                        .select("*")
                        .eq("courseid", course.courseid);

                    if (modulesError) throw modulesError;

                    setModuleData(modulesData || []);

                    // Redirige al primer módulo si hay módulos
                    if (modulesData && modulesData.length > 0) {
                        const firstModule = modulesData[0];
                        const moduleUrl = `/courses/module/${encodeURIComponent(firstModule.modulename.replace(/ /g, "-"))}`;
                        router.replace(moduleUrl); // Redirige al primer módulo
                    }else{
                        // No hay módulos, redirige a la página del curso
                        alert("There are no modules for this course yet, you will be redirected to the course page.");
                        router.replace(`/courses/`);
                    }

                }
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [coursename, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading course. Please try again later.</div>;
    }

    if (!courseData) {
        return <div>Course not found.</div>;
    }

    return null; // No renderiza nada, ya que redirigimos al primer módulo
}
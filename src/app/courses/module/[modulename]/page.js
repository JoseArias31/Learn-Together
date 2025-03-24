"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/navBar";
import Footer from "../../../components/footer";
import { supabase } from "src/app/lib/supabaseClient";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import Notebook from "../../../components/notebook";
import PropTypes from 'prop-types';
import useProtectedRoute from "src/app/auth/register/Hooks/useProtectedRoutes";

export default function ModulePage({ params }) {

    const session = useProtectedRoute();
    const { modulename } = use(params) || { modulename: "" };
    const [moduleData, setModuleData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [program, setProgram] = useState(null);
    const [modulesList, setModulesList] = useState([]); // Añade esto para almacenar la lista de módulos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(-1);  
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = (event) => {
      setIsOpen(event.target.open);
    };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Decodifica el nombre del módulo
                const decodedModulename = decodeURIComponent(modulename).replace(/-/g, " ");

                // Fetch the module by name
                const { data: module, error: moduleError } = await supabase
                    .from("modules")
                    .select("*")
                    .eq("modulename", decodedModulename)
                    .single();

                if (moduleError) throw moduleError;

                setModuleData(module);

                // Fetch the course for this module
                const { data: course, error: courseError } = await supabase
                    .from("courses")
                    .select("*")
                    .eq("courseid", module.courseid)
                    .single();

                if (courseError) throw courseError;

                setCourseData(course);

                // Fetch all modules for the course
                const { data: modules, error: modulesError } = await supabase
                    .from("modules")
                    .select("*")
                    .eq("courseid", module.courseid);

                if (modulesError) throw modulesError;

                setModulesList(modules); // Guarda la lista de módulos en el estado

                // Fetch program name for the course
                const { data: program, error: programError } = await supabase
                    .from("programs")
                    .select("programname")
                    .eq("programid", course.programid)
                    .single();

                if (programError) throw programError;

                setProgram(program);

                // Encuentra el índice del módulo actual
                const currentIndex = modules.findIndex((m) => m.modulename === module.modulename);
                setCurrentIndex(currentIndex); // Actualiza el estado de currentIndex
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [modulename]);

    const handleNextModule = async () => {
        try {
            // Si hay un siguiente módulo, redirige
            if (currentIndex < modulesList.length - 1) {
                const nextModule = modulesList[currentIndex + 1];
                const nextModuleUrl = `/courses/module/${encodeURIComponent(nextModule.modulename.replace(/ /g, "-"))}`;
                router.replace(nextModuleUrl);
            } else {
                alert(`Course in ${courseData.coursename} is completed!`);
            }
        } catch (error) {
            console.error("Error fetching next module:", error);
        }
    };

    const handlePreviousModule = async () => {
        try {
            if (currentIndex > 0) {
                const previousModule = modulesList[currentIndex - 1];
                const previousModuleUrl = `/courses/module/${encodeURIComponent(previousModule.modulename.replace(/ /g, "-"))}`;
                router.replace(previousModuleUrl);
            }
        } catch (error) {
            console.error("Error fetching previous module:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading module. Please try again later.</div>;
    }

    if (!moduleData || !courseData) {
        return <div>Module not found.</div>;
    }

    // Verifica si es el primer módulo
    const isFirstModule = moduleData.modulename === "Introduction"; // Ajusta esto según el nombre de tu primer módulo

    return (
        <div>
            <NavBar />
            {session ? (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
          Hi, {session.user.email.replace(/@[^@]+$/, "")}!
        </h1>
      </div>
    ) : (
      <div className="flex justify-center sm:justify-end mt-2  sm:mt-5 sm:mr-10">
        <h1 className="text-center font-kodchasan text-[13px] sm:text-base">
          Welcome to Learn Together! Please log in to complete this module.
        </h1>
      </div>
    )}
            <h1 className="mx-20 mt-6 text-xl md:text-2xl text-center font-bold mb-6 capitalize">{courseData.coursename}</h1>

            <div className="rounded lg:mx-28 mx-4 " style={{ backgroundColor: "#80808045", padding: "15px" }}>
                <h2 className="mb-2 font-bold">Course Overview</h2>
               
                <p className="text-gray-600 mb-4">{courseData.fulldescription}</p>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
                        <div className="flex items-center font-bold">
                            <BookOpen className="mr-2" />
                            <span>{modulesList?.length || 0} Modules</span>
                        </div>
                        <div className="flex items-center font-bold">
                            <Clock className="mr-2" />
                            <span>{courseData.duration} Program</span>
                        </div>
                        <div className="flex items-center font-bold">
                            <GraduationCap className="mr-2" />
                            <span>{program.programname}</span>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="mx-20 mt-6 text-base md:text-xl text-start  font-bold mb-6 capitalize">{moduleData.modulename}</h1>
            <div className="rounded  lg:mx-28 mx-4" style={{ backgroundColor: "#80808045", padding: "15px" }}>
                {/* Mostrar la introducción del curso solo en el primer módulo */}
                {isFirstModule && (
                    <>
                        <h2 className="mb-2 font-bold">Course Overview</h2>
                        <p className="text-gray-600 mb-4">{courseData.fulldescription}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
                            <div className="flex items-center font-bold">
                                <BookOpen className="mr-2" />
                                <span>{modulesList?.length || 0} Modules</span>
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
                    </>
                )}

                {/* Mostrar el contenido del módulo */}
                <h2 className="mb-2 font-bold">Module Content</h2>
                <p className="text-gray-600 mb-4">{moduleData.description}</p>
                <div className="flex flex-row justify-between mt-10">
                <div className="w-full">
                  
                  
                            <div  className="bg-gray-100 p-2 mt-2 rounded flex flex-col md:flex-col lg:flex-row sm:flex-row sm:items-center md:items-start md:gap-2 sm:justify-between">
                                <div className="text-start sm:text-left sm:w-[25%] md:w-full lg:w-[25%] h-[100%]">
                                    <h3 className="text-sm font-bold text-gray-800">{moduleData.modulename}</h3>
                                </div>
                            </div>
                     
                </div>
                
                <div className="content-center">
      {/* Para pantallas grandes: Usamos <details> y <summary> */}
      <div className="hidden md:flex">
        <details className="w-full group" open={isOpen} onToggle={handleToggle}>
          <summary className="text-sm font-bold text-gray-800 cursor-pointer flex hover:text-blue-500 justify-center mx-2 transition-all duration-300 ease-in-out hover:scale-105">
            Notebook
          </summary>
          <div className="transition-all duration-500 ease-in-out transform origin-top">
            <Notebook />
          </div>
        </details>
      </div>

      {/* Para pantallas pequeñas: Usamos un botón que abre el modal */}
      <div className="block md:hidden mx-2">
        <button
          className="text-sm font-bold text-gray-800 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
          onClick={openModal}
        >
          Notebook
        </button>
      </div>

      {/* Modal para pantallas pequeñas */}
      <dialog
        open={isModalOpen}
        onClose={closeModal}
        className={`fixed inset-0 w-full h-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 z-50 transform transition-all duration-300 ease-in-out ${
          isModalOpen 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          margin: 'auto',
          backgroundColor: 'white',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={closeModal}
            className="hover:text-gray-700 text-2xl font-bold transition-all duration-300 ease-in-out hover:scale-110 hover:text-red-500"
          >
            ×
          </button>
        </div>
        <div className="transform transition-all duration-500 ease-in-out">
          <Notebook />
        </div>
      </dialog>
      
      {/* Overlay for modal backdrop */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40"
          onClick={closeModal}
        ></div>
      )}
    </div>
            </div>

                
                {/* Botón "Siguiente" */}
                <div className="flex flex-row justify-between mt-6">
               
                {currentIndex > 0 ? (
                        <button
                            onClick={handlePreviousModule}
                            className="bg-blue-500 text-white px-2 py-2 rounded text-xs"
                        >
                            Previous Module
                        </button>
                    ) : (
                        <button 
                            disabled 
                            className="bg-blue-500 text-white px-2 py-2 rounded opacity-50 cursor-not-allowed text-xs"
                        >
                            No Previous Module
                        </button>
                    )}           <button
                    onClick={handleNextModule}
                    className="bg-blue-500 text-white text-xs px-4 py-2 rounded"
                >
                    Next Module
                </button>
               
                </div>
            </div>
            <Footer />
        </div>
    );
}
ModulePage.propTypes = {
    params: PropTypes.shape({
        modulename: PropTypes.string.isRequired,
    }).isRequired,
};
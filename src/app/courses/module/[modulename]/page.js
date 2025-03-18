"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/navBar";
import Footer from "../../../components/footer";
import { supabase } from "src/app/lib/supabaseClient";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import Notebook from "../../../components/notebook";
import PropTypes from 'prop-types';

export default function ModulePage({ params }) {
    const { modulename } = use(params) || { modulename: "" };
    const [moduleData, setModuleData] = useState(null);
    const [courseData, setCourseData] = useState(null);
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
            <h1 className="mx-20 mt-6 text-3xl font-bold mb-6 capitalize">{courseData.coursename}</h1>

            <div className="rounded lg:mx-28 mx-4 " style={{ backgroundColor: "#80808045", padding: "15px" }}>
                <h2 className="mb-2 font-bold">Course Overview</h2>
               
                <p className="text-gray-600 mb-4">{courseData.fulldescription}</p>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
                        <div className="flex items-center font-bold">
                            <BookOpen className="mr-2" />
                            <span>{moduleData.length} Modules</span>
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
            <h1 className="mx-20 mt-6 text-3xl font-bold mb-6 capitalize">{moduleData.modulename}</h1>
            <div className="rounded  lg:mx-28 mx-4" style={{ backgroundColor: "#80808045", padding: "15px" }}>
                {/* Mostrar la introducción del curso solo en el primer módulo */}
                {isFirstModule && (
                    <>
                        <h2 className="mb-2 font-bold">Course Overview</h2>
                        <p className="text-gray-600 mb-4">{courseData.fulldescription}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:items-start md:items-start lg:items-start lg:place-items-center">
                            <div className="flex items-center font-bold">
                                <BookOpen className="mr-2" />
                                <span>{moduleData.modules?.length || 0} Modules</span>
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
      <div className=" hidden md:flex">
      <details className="w-full" open={isOpen} onToggle={handleToggle}>
        <summary className="text-sm font-bold text-gray-800 cursor-pointer flex hover:text-blue-500 justify-center mx-2">
          Notebook
        </summary>
        <Notebook />
      </details>
    </div>

      {/* Para pantallas pequeñas: Usamos un botón que abre el modal */}
      <div className="block md:hidden mx-2">
        <button
          className="text-sm font-bold text-gray-800 cursor-pointer"
          onClick={openModal}
        >
          Notebook
        </button>
      </div>

      {/* Modal para pantallas pequeñas */}
      <dialog
        open={isModalOpen}
        onClose={closeModal}
        className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 z-10"
        
      >
        <div className="flex justify-end items-center mb-4">
          
          <button
            onClick={closeModal}
            className="hover:text-gray-700 text-2xl font-bold"
          >
           x
          </button>
        </div>
        <Notebook />
      </dialog>
    </div>
            </div>

                
                {/* Botón "Siguiente" */}
                <div className="flex flex-row justify-between">
               
                {currentIndex > 0 ? (
                        <button
                            onClick={handlePreviousModule}
                            className="bg-blue-500 text-white px-2 py-2 rounded"
                        >
                            Previous Module
                        </button>
                    ) : (
                        <button 
                            disabled 
                            className="bg-blue-500 text-white px-2 py-2 rounded opacity-50 cursor-not-allowed"
                        >
                            No Previous Module
                        </button>
                    )}           <button
                    onClick={handleNextModule}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
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
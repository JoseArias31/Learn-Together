import React, { useEffect, useState } from "react";
import "./styles/cards.css"; // Keeping your styles
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

const WebDevelopmentPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase.from("programs").select("*");
        if (error) throw error;
        setPrograms(data || []);
      } catch (error) {
        setError("Failed to load programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-y-6 md:gap-6 px-4 sm:px-10 mr-10 ml-10">

      {loading ? (
        <p className="text-center text-white">Loading programs...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : programs.length > 0 ? (
        programs.slice(0, 6).map((program) => (
          <Link
            className="program-card w-full max-w-[250px] xxl:h-[140px]  mx-auto p-2 transition-all duration-300 hover:scale-105 hover:shadow-neon" // Adjusted max-width, height, and padding
            style={{
              background: "linear-gradient(145deg, #080808, #202F20)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(72, 255, 0, 0.3)",
              borderRadius: "30px 10px 30px 10px",
              boxShadow: "0 4px 30px rgba(72, 255, 0, 0.1)",
              fontFamily: "monospace",
              padding: "0.7rem",
              paddingTop: "1.5rem",
              
              
            }}
            key={program.programid}
            href={`/programs/${program.programname.replace(/ /g, "-")}`}
          >
           <h3 className="text-green-400 text-2xl lg:text-2xl font-bold mb-4 lg:mb-2 hover:text-green-300 transition-colors duration-300">
  {program.programname}
</h3>
<p className="!text-white mb-4 lg:mb-2 opacity-80 hover:opacity-100 transition-opacity duration-300 text-base lg:text-sm">
  {program.description}
</p>
<p className="text-white mb-4 lg:mb-6 opacity-80 hover:opacity-100 transition-opacity duration-300 text-base lg:text-xs">
  {program.duration}
</p>

          </Link>
        ))
      ) : (
        <p className="text-center text-white">No programs available.</p>
      )}
    </div>
  );
};

export default WebDevelopmentPrograms;

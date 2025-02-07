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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-6 mr-6">
      {loading ? (
        <p className="text-center text-white">Loading programs...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : programs.length > 0 ? (
        programs.slice(0, 6).map((program) => (
          <Link
          className="program-card w-full max-w-[300px] h-[190px] mx-auto p-4 transition-all duration-300 hover:scale-105 hover:shadow-neon" // Adjusted max-width, height, and padding
          style={{
            background: "linear-gradient(145deg, #080808, #202F20)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(72, 255, 0, 0.3)",
            borderRadius: "30px 10px 30px 10px",
            boxShadow: "0 4px 30px rgba(72, 255, 0, 0.1)",
          }}
          key={program.programid}
          href={`/programs/${program.programname.replace(/ /g, '-')}`}
        >
            <h3 className="text-green-400 text-2xl font-bold mb-4 hover:text-green-300 transition-colors duration-300">
    {program.programname}
  </h3>
  <p className="!text-white mb-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
    {program.description}
  </p>
  <p className="text-white mb-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
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

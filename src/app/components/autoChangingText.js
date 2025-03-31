import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient"; // Ensure correct import

export const AutoChangingText = () => {
  const [currentText, setCurrentText] = useState(""); // The text being typed
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks which program is being shown
  const [isAdding, setIsAdding] = useState(true); // Determines if we are typing or deleting
  const [enter, setEnter] = useState(""); // Stores input text
  const [programNamesList, setProgramNamesList] = useState([]);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setEnter("Enter");
      console.log("Enter key pressed!: ", enter);
      alert(`Enter key pressed!:  ${enter}`);
    }
  }

  // Fetch programs from Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase.from("programs").select("programname");

        if (error) throw error;
        setProgramNamesList(data.map((program) => program.programname));
      } catch (error) {
        console.error("Error fetching programs:", error.message);
      }
    };

    fetchPrograms();
  }, []); // Runs once when the component mounts

  // Typing effect
  useEffect(() => {
    if (programNamesList.length === 0) return; // Ensure programs are loaded

    const currentProgram = programNamesList[currentIndex];
    const programsWithDots = currentProgram + " . . ."; // Add dots to the program name
    let timeout;

    if (isAdding) {
      // Typing effect
      if (currentText.length < programsWithDots.length) {
        timeout = setTimeout(() => {
          setCurrentText(programsWithDots.slice(0, currentText.length + 1));
        }, 100);
      } else {
        // Once full text is typed, pause and start deleting
        setTimeout(() => setIsAdding(false), 200);
      }
    } else {
      // Erasing effect
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(programsWithDots.slice(0, currentText.length - 1));
        }, 100);
      } else {
        // Once fully erased, move to the next program
        setIsAdding(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % programNamesList.length);
      }
    }

    return () => clearTimeout(timeout); // Cleanup function
  }, [currentText, isAdding, currentIndex, programNamesList]);

  return (
    <div className="relative justify-center">
      <input
        type="text"
        placeholder={`${currentText}`} // Dynamic placeholder
        className="border-green-400 py-2 pl-10 pr-4 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-5"
        onChange={(e) => setEnter(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

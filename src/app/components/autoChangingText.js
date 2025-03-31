"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabaseClient"

// SVG icons as direct JSX elements
const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400 dark:text-gray-500"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
)

const sendIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400 dark:text-gray-500"
  >
    <path d="m22 2-7 20-4-9-9-4Z"></path>
    <path d="M22 2 11 13"></path>
  </svg>
)

export const AutoChangingText = () => {
  const [currentText, setCurrentText] = useState("") // The text being typed
  const [currentIndex, setCurrentIndex] = useState(0) // Tracks which program is being shown
  const [isAdding, setIsAdding] = useState(true) // Determines if we are typing or deleting
  const [searchQuery, setSearchQuery] = useState("") // Stores input text
  const [programNamesList, setProgramNamesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function handleKeyPress(e) {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault()
      console.log("Searching for:", searchQuery)
      router.push(`/programs/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Fetch programs from Supabase
  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from("programs").select("programname")

        if (error) throw error
        setProgramNamesList(data.map((program) => program.programname))
      } catch (error) {
        console.error("Error fetching programs:", error.message)
        // Fallback data in case of error
        setProgramNamesList(["JavaScript", "Python", "React", "Next.js", "Node.js"])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrograms()
  }, []) // Runs once when the component mounts

  // Typing effect
  useEffect(() => {
    if (programNamesList.length === 0) return // Ensure programs are loaded

    const currentProgram = programNamesList[currentIndex]
    const programsWithDots = currentProgram + " . . ." // Add dots to the program name
    let timeout

    if (isAdding) {
      // Typing effect
      if (currentText.length < programsWithDots.length) {
        timeout = setTimeout(() => {
          setCurrentText(programsWithDots.slice(0, currentText.length + 1))
        }, 100)
      } else {
        // Once full text is typed, pause and start deleting
        setTimeout(() => setIsAdding(false), 1000) // Longer pause to read the text
      }
    } else {
      // Erasing effect
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(programsWithDots.slice(0, currentText.length - 1))
        }, 50) // Faster erasing
      } else {
        // Once fully erased, move to the next program
        setIsAdding(true)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % programNamesList.length)
      }
    }

    return () => clearTimeout(timeout) // Cleanup function
  }, [currentText, isAdding, currentIndex, programNamesList])

  // Handle suggestions based on current input
  const getSuggestions = () => {
    if (!searchQuery.trim() || !programNamesList.length) return []

    const query = searchQuery.toLowerCase()
    return programNamesList.filter((program) => program.toLowerCase().includes(query)).slice(0, 5) // Limit to 5 suggestions
  }

  const suggestions = getSuggestions()

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full max-w-sm sticky top-0 bg-background z-10 pt-4 pb-1">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block" htmlFor="search">
            Search Programs
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={currentText || "Search for a program..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg border border-green-300 dark:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-200">
              {searchQuery.length > 0 ? (
                <div
                  className="transition-all duration-200 transform translate-y-0 opacity-100 cursor-pointer"
                  onClick={() =>
                    searchQuery.trim() && router.push(`/programs/${encodeURIComponent(searchQuery.trim())}`)
                  }
                >
                  {sendIcon}
                </div>
              ) : (
                <div className="transition-all duration-200 transform translate-y-0 opacity-100">{searchIcon}</div>
              )}
            </div>
          </div>

          {/* Live suggestions */}
          {searchQuery.trim() && suggestions.length > 0 && (
            <div className="absolute w-full max-w-sm mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
              <ul className="py-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 flex items-center"
                    onClick={() => {
                      setSearchQuery(suggestion)
                      router.push(`/programs/${encodeURIComponent(suggestion).replace(/%20/g, "-")}`);
                    }}
                  >
                    <span className="mr-2">{searchIcon}</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Animated hint */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Press Enter to search for programs
        </div>
      </div>
    </div>
  )
}

export default AutoChangingText


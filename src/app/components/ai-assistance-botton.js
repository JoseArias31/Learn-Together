"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

const AIAssistanceButton = () => {
  const router = useRouter()

  return (
    <div className="relative group ">
      {/* Define the animation */}
      {/* <style jsx>{`
        @keyframes moveGradient {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style> */}
      {/* Main button */}
      <Link href="/ai-assistance" className="inline-flex items-center">
        <div className="relative overflow-hidden rounded-full p-[1px] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]">
          {/* Seamless looping border animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-400 animate-spin [animation-duration:8s]">
            <div className="absolute inset-0 w-[150%] bg-gradient-to-r from-green-400 via-green-500 to-green-400 from-green-400 animate-[moveGradient_3s_linear_infinite] rounded-full"></div>
          </div>

          {/* Button content */}
          <div className="relative flex items-center  px-1 py-3 bg-black rounded-full group-hover:bg-black/90 transition-all duration-300">
            {/* AI Icon with pulse effect */}
            <div className="relative flex items-center justify-center  w-4 h-4 bg-green-500/10 rounded-full border border-green-500/30">
              <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <span className="text-white text-xs ml-1 mr-1 font-medium">AI Assistant</span>

            {/* Arrow icon with animation */}
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
              className="text-green-400 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </Link>

      {/* Floating tooltip that appears on hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-black border border-green-500/20 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Get instant help with AI
        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-r border-b border-green-500/20 transform rotate-45"></div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
    </div>
  )
}

export default AIAssistanceButton


"use client"

import { useState } from "react"
import { marked } from "marked"
import styles from "../components/styles/SyteleChatDeepSeekR1"
const ChatAssistant = () => {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponse("Please enter a message.")
      return
    }

    const userInput = input
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY}`,
          "HTTP-Referer": "https://learn-together-six.vercel.app",
          "X-Title": "Learn Together",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: userInput }],
        }),
      })

      const data = await res.json()
      const markdownText = data.choices?.[0]?.message?.content || "No response received."
      setResponse(marked.parse(markdownText))
    } catch (err) {
      setError(err.message)
      console.error("API Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="chat-container w-full max-w-3xl mx-auto">
        {/* Main chat container */}
        <div className="relative overflow-hidden rounded-xl border border-green-500/30 bg-black/80 backdrop-blur-sm shadow-lg">
          {/* Glowing accent */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[50%] top-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 z-0 transform rotate-45 opacity-30"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
          </div>

          {/* Header */}
          <div className="relative px-6 py-4 border-b border-green-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 pulse-dot"></div>
              <h3 className="text-xl font-medium text-white">AI Assistant</h3>
            </div>
            <div className="text-xs text-green-400/70">powered by DeepSeek R1</div>
          </div>

          {/* Content */}
          <div className="relative p-6 min-h-[300px] max-h-[60vh] overflow-y-auto">
            {error && (
              <div className="p-3 text-sm bg-red-900/20 text-red-400 rounded-md border border-red-500/30 mb-4">
                Error: {error}
              </div>
            )}

            {!response && !error && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20 flex items-center justify-center border border-green-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">How can I help you today?</h4>
                <p className="text-gray-400 max-w-2xl">
                  Ask me about any of our programs, coding challenges, or learning resources.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-md">
                  {[
                    "Tell me about Backend Development",
                    "Explain Data Science basics",
                    "How to start Mobile Development?",
                    "DevOps best practices",
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(suggestion)
                      }}
                      className="text-left px-3 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-md text-sm text-green-400 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {response && (
              <div
                className="chat-response p-5 bg-black/40 rounded-lg border border-green-500/20 text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: response }}
              />
            )}
          </div>

          {/* Footer */}
          <div className="relative px-6 py-4 border-t border-green-500/20 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our programs or any coding questions..."
              className="chat-input flex-1 min-h-[44px] resize-none px-4 py-3 bg-black/60 border border-green-500/30 rounded-lg focus:outline-none text-white placeholder-gray-500 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="chat-button h-[44px] w-[44px] shrink-0 flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              )}
            </button>
          </div>

          {/* Code pattern background */}
          <div className="absolute inset-0 -z-10 overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute inset-0 text-[0.6rem] text-green-500 overflow-hidden leading-tight tracking-wide font-mono">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                  {Array.from({ length: 50 }).map((_, j) => (
                    <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        
      </div>
    </>
  )
}

export default ChatAssistant
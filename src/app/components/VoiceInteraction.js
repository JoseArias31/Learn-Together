import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import mic from "../../../public/mic.png";

const VoiceInteraction = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  let recognition;

  // Check if the browser supports Speech Recognition
  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false; // Stop after the user stops talking
    recognition.interimResults = false; // Disable interim results
    recognition.lang = "en-US"; // Set language
  }

  // Start listening to user's voice
  const startListening = () => {
    if (!recognition)
      return alert("Your browser does not support speech recognition.");
    setIsListening(true);

    recognition.start();
    recognition.onresult = (event) => {
      const userInput = event.results[0][0].transcript; // Captured speech
      setTranscript(userInput);
      handleResponse(userInput); // Process input and get a response
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Error:", err);
      setIsListening(false);
    };
  };

  // Function to handle the response from OpenAI API
  const handleResponse = async (userInput) => {
    try {
      const result = await fetchOpenAIResponse(userInput);
      setResponse(result);
      speakResponse(result);
    } catch (err) {
      console.error("Error fetching OpenAI response:", err);
      setResponse("Sorry, I could not understand that.");
    }
  };

  // Fetch response from OpenAI API
  const fetchOpenAIResponse = async (userInput) => {
    const apiKey = process.env.OPENAI_API_KEY; // Set this in your .env.local

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // Updated endpoint for chat-based models
      {
        model: "gpt-3.5-turbo", // Use gpt-3.5-turbo (a free model)
        messages: [
          { role: "system", content: "You are a helpful assistant." }, // Optional, can define a system message
          { role: "user", content: userInput }, // The user's input
        ],
        max_tokens: 100, // Optional, can adjust based on your needs
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json", // Make sure to specify the content type
        },
      }
    );

    return response.data.choices[0].message.content.trim(); // Return the assistant's response
  };

  // Use Speech Synthesis to speak out the AI's response
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "20px" }}
      className="flex flex-col "
    >
      <h2>Click the mic and start talking!</h2>
      <button
        className="hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-2 flex-col"
        onClick={startListening}
        disabled={isListening}
      >
        <Image src={mic} alt="microphone" width={40} height={40} />
        <span>{isListening ? "Listening..." : "Start Talking"}</span>
      </button>

      <div style={{ marginTop: "20px" }}>
        {transcript && (
          <p>
            <strong>You said:</strong> {transcript}
          </p>
        )}
        {response && (
          <p>
            <strong>AI Response:</strong> {response}
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceInteraction;

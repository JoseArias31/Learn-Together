import ChatAssistant from "../components/ChatDeepSeekR1"

export default function AIAssistancePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-black  ">AI Assistance</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Ask questions and get intelligent responses powered by DeepSeek R1
      </p>
      <ChatAssistant />
    </div>
  )
}


import ChatAssistant from "../components/ChatDeepSeekR1"
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function AIAssistancePage() {
  return (
    <div className="w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
     <NavBar />
    <div className="container mx-auto px-4 py-8 md:py-12">
     
      <h1 className="text-3xl font-bold mb-6 text-center text-white  ">AI Assistance</h1>
      <p className="text-gray-300 dark:text-gray-400 text-center mb-8">
        Ask questions and get intelligent responses powered by DeepSeek R1
      </p>
      <ChatAssistant />
      
    </div>
    <Footer />
    </div>
  )
}


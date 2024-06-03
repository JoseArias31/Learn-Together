
import NavBar from "../../components/navBar"
import Footer from "../../components/footer";


export default function Home() {
  return (
   <>
    <NavBar />  
    <h1 className="text-center mt-20 text-6xl font-kodchasan">Choose literary any program and unlock your potential like this website</h1>
    <div className="mt-10">
    <h2 className="text-center font-kodchasan">You can get help with AI assistance anytime, anywhere</h2>
    <h2 className="text-center font-kodchasan">Don’t believe it? Try it yourself by clicking on the chat icon.</h2>
    </div>
    <Footer />
    </>
  );
}

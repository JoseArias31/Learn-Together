

import NavBar from "./components/navBar"
import Footer from "./components/footer";
import MainButton from "./components/MainBotton";
import WebDevelopmentPrograms from "./components/Cards";
import SecondaryButton from "./components/SecondaryBotton";
import CourseCards from "./components/CourseCards"
import ThirdButton from "./components/ThirdBotton"


export default function Home() {
  return (
    <div class="absolute text-white top-0 z-[-2]  w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <NavBar />  
    <h1 className="text-center mt-20 text-2xl font-kodchasan" style={{fontSize: "2rem"}}>Choose literary any program and unlock your potential like this website</h1>
    <div className="mt-10">
    <h2 className="text-center font-kodchasan text-2xl mb-2">You can get help with AI assistance anytime, anywhere</h2>
    <h2 className="text-center font-kodchasan">Don’t believe it? Try it yourself by clicking on the chat icon.</h2>
    </div>
 <MainButton />
 <h1 className="text-start mt-10 text-6xl font-kodchasan ml-20">Explore</h1>
 <h2 className="text-start font-kodchasan ml-20 mt-10"><strong>Learn Together</strong> offers a wide range of educational programs to help you achieve your goals.</h2>
 <WebDevelopmentPrograms />
<SecondaryButton />
<h1 className="text-center mt-10 text-6xl font-kodchasan">Feature Courses</h1>
<h2 className="text-center font-kodchasan">Explore our wide range of courses and find the perfect one for you.
</h2>
<CourseCards />
<ThirdButton />
    <Footer />
    </div>
  );
}

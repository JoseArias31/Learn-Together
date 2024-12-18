
import NavBar from "./components/navBar"
import Footer from "./components/footer";
import MainButton from "./components/MainBotton";
import WebDevelopmentPrograms from "./components/Cards";
import SecondaryButton from "./components/SecondaryBotton";
import CourseCards from "./components/CourseCards"
import ThirdButton from "./components/ThirdBotton"


export default function Home() {
  return (
   <div className="bg-custom-gradient text-white">
    <NavBar />  
    <h1 className="text-center mt-20 text-6xl font-kodchasan">Choose literary any program and unlock your potential like this website</h1>
    <div className="mt-10">
    <h2 className="text-center font-kodchasan">You can get help with AI assistance anytime, anywhere</h2>
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

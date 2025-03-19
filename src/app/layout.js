import { Inter } from "next/font/google";
import "./globals.css";
import "./components/navBar"
// import NavBar from "./components/navBar";
  // import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn Together",
  description: "Learn Together is a powerful and leading website that provides literary any program and is guided by AI technology through both chat and voice. Make your learning journey an adventure.  ",
};

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    
    <html lang="en">

    {/* chat assistance app, only 7 free days trial */}
      <script src="//code.tidio.co/wjsrt43bjl5bx0uogxmfhf47qkeszu6z.js" async></script>

      <body className={inter.className}>{children}</body>
     

    </html>
  );
}

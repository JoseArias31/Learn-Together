import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Learn Together",
  description: "Learn Together is a powerful and leading website that provides literary any program and is guided by AI technology through both chat and voice. Make your learning journey an adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="//code.tidio.co/wjsrt43bjl5bx0uogxmfhf47qkeszu6z.js" async></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

"use client";
// components/Login.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Image from "next/image";
import { Fullscreen } from "lucide-react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
        return;
      }
  
      if (data.session) {
        const userId = data.session.user.id;
  
        // Query the membership info
        const { data: membershipData, error: membershipError } = await supabase
          .from("users")
          .select("membership") // or whatever your column is called (maybe 'type')
          .eq("id", userId)
          .single();
  
        if (membershipError || !membershipData) {
          console.error('Error fetching role:', membershipError);
          setError('Could not determine user role.');
          return;
        }
  
        const role = membershipData.membership;
  
        if (role === 'Admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('Login failed. No session found.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
   <>
    <NavBar />
   <div className="flex min-h-full flex-1 flex-col   items-center ">
    <div className="flex flex-row w-full">
    <div className="w-1/2 h-screen relative hidden md:flex">
   
   {/*This image can be replaced anytime with any other image*/}
    <Image 
      src={"/signingCover2.png"} 
      alt="Sign-in Cover" 
      layout="fill" 
      objectFit="cover"
    />
  </div>
     
      <div className="mt-10 w-full px-4 sm:mx-auto sm:w-full sm:max-w-sm content-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-10">
          Sign in to your account
        </h2>
      </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900 font-semibold"
        >
          Email:
        </label>
        <input
          type="email"
          placeholder="Type your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-xs pl-3 h-12"
        />
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 font-semibold"
          >
            Password:
          </label>
        </div>
        <input
          type="password"
          placeholder="Type your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-black font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-xs pl-3 h-12"
        />
        <div className="text-sm mt-2 mb-2">
          <a
            href="/forgot-password"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>

        <button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="text-base text-center mt-2 mb-10">
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create an account!
          </a>
        </div>
      </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

"use client";
// components/Login.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import NavBar from "../components/navBar";
import Footer from "../components/footer";


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
  
      console.log('Login response:', data); // Debugging
  
      if (data.session) {
        console.log('Session found:', data.session); // Debugging
        router.push('/dashboard');
      } else {
        setError('Login failed. No session found.');
      }
    } catch (err) {
      console.error('Login error:', err); // Debugging
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
   

  return (
   <>
    <NavBar />
   <div className="flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8 items-center ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 w-full px-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900 font-semibold  "
        >
          Email:
        </label>
        <input
          type="email"
          placeholder="Type your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-xs pl-3"
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
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-xs pl-3"
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
        <div className="text-base text-center mt-2">
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create an account!
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

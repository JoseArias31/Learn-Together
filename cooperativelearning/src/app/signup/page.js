"use client"

// pages/signup.js

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import NavBar from '../components/navBar';
import Footer from '../components/footer';


const Signup = () => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [displayName, setDisplayName] = useState('');
  // const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const inputStyle = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-xs pl-3';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      router.push('/dashboard');
      
    }
 
  };

  return (
    <>
     <NavBar />  
    <div className='flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8 items-center '>
     
      <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Create your Account</h2>
      <form onSubmit={handleSubmit} >
        <div style={{ marginBottom: '1rem', width: '350px', marginLeft:'0px' }} className="mt-10 w-full  sm:mx-auto sm:w-full sm:max-w-sm">
         
        
        
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 font-semibold">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
            className= {inputStyle}
            placeholder='Type your Email Address'
          />
     
        
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
            className= {inputStyle}
            placeholder='Type a safe Password'
          />

       </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ padding: '0.5rem 1rem' }}className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="text-sx text-center mt-2">
                  <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Do you have an account? Log in here
                  </a>
                </div>
      </form>
     
    </div>
    <Footer />
    </>
  );
};

export default Signup;

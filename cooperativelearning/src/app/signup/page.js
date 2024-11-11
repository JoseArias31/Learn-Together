"use client"

// pages/signup.js

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
const Signup = () => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [displayName, setDisplayName] = useState('');
  // const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const inputStyle = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[800px]';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(true);

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      // data: { username, display_name: displayName, phone },
      data: { email, password },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      router.push('/');
      
    }
 
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center h-screen '>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem', width: '350px' }}>
          {/* <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
            className= {inputStyle}
            placeholder='Type your Username'
          /> */}
        
        
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
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
{/*       
        
          <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
            className= {inputStyle}
            placeholder='Type your First and Last Name'
          />
       
      
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            className= {inputStyle}
            placeholder='Type your phone number'
          /> */}
       </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ padding: '0.5rem 1rem' }}className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={handleSubmit} disabled={success}>
        {success ? 'Creating...' : 'Create'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="text-sm text-center">
                  <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Do you have an account? Log in here
                  </a>
                </div>
      </form>
    </div>
  );
};

export default Signup;

// src/app/dashboard/page.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const session = supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      }
    };

    checkUser(); // Call checkUser function
  }, [router]); // Add router to dependencies array

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        } else {
          setUserEmail(user.email); // Set user's email to state
       
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, []); // Empty dependencies array to run only once on mount

  
  return (
    <div>
      <h1>Dashboard</h1>
    
      {userEmail && <p>Welcome {userEmail} to the dashboard!</p>}
    </div>
  );
};

export default Dashboard;

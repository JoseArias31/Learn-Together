
"use client";

import useUserProfile from './useUserProfile';
import ButtonGoHome from './ButtonGoHome';
const Dashboard = () => {
  const { user, loading, error } = useUserProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="card">
      <h2>User Profile:</h2>
      <code className="highlight">{user.email}</code>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>
      <ButtonGoHome />
    </div>
  );
};

export default Dashboard;

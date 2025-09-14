import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showSignup, setShowSignup] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  if (token) {
    return <Notes token={token} onLogout={logout} />;
  }

  if (showSignup) {
    return (
      <>
        <Signup onSignup={() => setShowSignup(false)} />
        <button onClick={() => setShowSignup(false)}>Back to Login</button>
      </>
    );
  }

  return (
    <>
      <Login onLogin={setToken} />
      <button onClick={() => setShowSignup(true)}>Sign Up</button>
    </>
  );
}

export default App;

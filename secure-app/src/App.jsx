// src/App.jsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChuckNorris from './components/ChuckNorris';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Basic front-end sanitization function
  // (in a real app, also validate on the server).
  const sanitizeInput = (value) => {
    // remove any script tags or special HTML chars
    //
    return value.replace(/<script[^>]*?>.*?<\/script>/gi, '')
                .replace(/[<>]/g, '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Basic front-end checks (both fields non-empty).
    if (!username || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    // 2. Sanitize user inputs (avoid potential injection in request).
    const cleanedUsername = sanitizeInput(username);
    const cleanedPassword = sanitizeInput(password);

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // 3. Send credentials safely in the body.
        body: JSON.stringify({
          username: cleanedUsername,
          password: cleanedPassword
        })
      });

      const data = await response.json();

      // 4. Check for success (token/uuid).
      if (response.ok && data.uuid) {
        setToken(data.uuid);
        setErrorMessage('');

        // (Optional) Clear username/password in state 
        // so they’re not stored in memory after login.
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Login failed. Check credentials.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Secure Web App</h1>

      {!token ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          errorMessage={errorMessage}
        />
      ) : (
        <ChuckNorris token={token} />
      )}
        <div>
          <h2>Logged In</h2>
          <p>Token: {token}</p>
        </div>
    </div>
  );
}

export default App;

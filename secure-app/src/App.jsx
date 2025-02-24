import React, { useState } from 'react';
import ChuckNorris from './components/ChuckNorris';
import LoginForm from './components/LoginForm';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // basic front-end sanitization
  const sanitizeInput = (value) => {
    // remove any script tags or special HTML chars
    return value
      .replace(/<script[^>]*?>.*?<\/script>/gi, '')
      .replace(/[<>]/g, '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. basic front-end checks
    if (!username || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    // 2. sanitize user inputs
    const cleanedUsername = sanitizeInput(username);
    const cleanedPassword = sanitizeInput(password);

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // 3. send credentials safely in the body.
        body: JSON.stringify({
          username: cleanedUsername,
          password: cleanedPassword
        })
      });

      const data = await response.json();

      // 4. check for success (token/uuid).
      if (response.ok && data.uuid) {
        setToken(data.uuid);
        setErrorMessage('');
        // 5. clear the form.
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Login failed. Check credentials.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // bonus: logout feature
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Logout request failed:', err);
    }
    setToken(null);
    setErrorMessage('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Lab 2: Secure Lab Application</h1>
      <div style={styles.card}>
        {!token && (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
          />
        )}
        {token && (
          <>
            <ChuckNorris token={token} />
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  header: {
    marginBottom: '20px',
    color: '#333'
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px'
  }
};

export default App;

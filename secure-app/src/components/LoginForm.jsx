// src/components/LoginForm.jsx
import React from 'react';

function LoginForm({
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    errorMessage
}) {
    return (
        <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="username">Email</label>
                <input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    required
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginTop: '5px' }}
                    required
                />
            </div>

            {errorMessage && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
            )}

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;

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
        <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
                <label
                    htmlFor="username"
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                >
                    Email
                </label>
                <input
                    id="username"
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        boxSizing: 'border-box'
                    }}
                    required
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label
                    htmlFor="password"
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        boxSizing: 'border-box'
                    }}
                    required
                />
            </div>

            {errorMessage && (
                <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '15px' }}>
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;

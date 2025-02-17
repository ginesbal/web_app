
import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <h2>Welcome! You are logged in.</h2>
      )}
    </div>
  );
}

export default App;


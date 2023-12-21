// components/Login.js
import React, { useState } from 'react';

const Login = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Validate inputs or perform any other necessary logic
    onLogin({ email, password });

    // Close the modal after handling the login
    onClose();
  };

  return (
    <div>
      <h3>Login</h3>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="form-control mb-2"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control mb-2"
        />

        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2 ">
          Submit
        </button>
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Login;

// components/Register.js
import React, { useState } from 'react';

const Register = ({ onClose, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Validate inputs or perform any other necessary logic
    onRegister({ name, email, password });

    // Close the modal after handling the registration
    onClose();
  };

  return (
    <div>
      <h3>Register</h3>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="form-control mb-2"
        />

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

        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2">
          Submit
        </button>
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Register;

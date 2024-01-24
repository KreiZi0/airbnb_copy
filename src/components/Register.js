// Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebase';

const Register = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the user's UID (unique identifier)
      const userId = userCredential.user.uid;

      // Store additional user information in the database
      const userRef = ref(database, `users/${userId}`);
      await set(userRef, {
        email,
        // Add other user data as needed
      });

      // Close the modal after successful registration
      onClose();

      // Log success message to the console
      console.log('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Register;

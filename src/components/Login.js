// Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Login = ({ onClose, onLogin, auth, database }) => {
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

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      
      if (typeof onLogin === 'function') {
        onLogin(userData);
      }

      onClose();
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

        <button type="button" onClick={handleSubmit} className="btn btn-primary me-2" disabled={loading}>
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        <button type="button" onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Login;

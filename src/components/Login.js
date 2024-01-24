import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Login = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log('Starting login...');
      console.log('onLogin:', onLogin);
      console.log('onLogin.auth:', onLogin.auth);
      console.log('onLogin.database:', onLogin.database);
  
      if (!onLogin || !onLogin.auth || !onLogin.database) {
        console.error('Invalid onLogin prop.');
        return;
      }

      // Authenticate user with email and password
      const userCredential = await signInWithEmailAndPassword(onLogin.auth, email, password);

      // Get the user's UID (unique identifier)
      const userId = userCredential.user.uid;

      // Fetch user data from the database
      const userRef = ref(onLogin.database, `users/${userId}`);
      const userSnapshot = await get(userRef);

      // Extract user data from the snapshot
      const userData = userSnapshot.val();

      // Call the onLogin function with user data
      onLogin(userData);

      // Close the modal after successful login
      onClose();
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Invalid email or password. Please try again.');
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

export default Login;

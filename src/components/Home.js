import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { auth } from '../firebase'; // Import the Firebase objects
import '../styles/Home.css';

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State for success message

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const handleLogin = (credentials) => {
    // Implement your login logic here using 'credentials'
    console.log('Login credentials:', credentials);
  };

  const handleLogout = () => {
    // Implement logout logic
    // For now, just sign out the user
    auth.signOut();
  };

  const handleRegister = async (userInfo) => {
    try {
      // Your registration logic here using 'userInfo'
      console.log('Registration details:', userInfo);

      // Set the registration success state to true
      setRegistrationSuccess(true);

      // Close the register modal after successful registration
      closeRegisterModal();
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div>
      <div className="header-container">
        <h2 className="m-3">Airbnb Copy Pasta</h2>
        {auth.currentUser ? (
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className="text-right">
            <button className="btn btn-primary mt-3 me-2" onClick={openLoginModal}>
              Login
            </button>
            <button className="btn btn-success mt-3 me-2" onClick={openRegisterModal}>
              Signup
            </button>
          </div>
        )}
      </div>
      <div className="line"></div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <Login onClose={closeLoginModal} onLogin={handleLogin} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="modal-overlay" onClick={closeRegisterModal}>
          <div className="register-modal" onClick={(e) => e.stopPropagation()}>
            <Register onClose={closeRegisterModal} onRegister={handleRegister} />
          </div>
        </div>
      )}

      {/* Registration Success Message */}
      {registrationSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Registration was successful!
        </div>
      )}
    </div>
  );
};

export default Home;

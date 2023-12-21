import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register'; // Import the Register component
import '../styles/Home.css';

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false); // State for Register modal

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

  const handleRegister = (userInfo) => {
    // Implement your registration logic here using 'userInfo'
    console.log('Registration details:', userInfo);
  };

  return (
    <div>
      <div className="header-container">
        <h2 className="m-3">Airbnb Copy Pasta</h2>
        <div className="text-right">
          <button className="btn btn-primary mt-3 me-2" onClick={openLoginModal}>
            Login
          </button>
          <button className="btn btn-success mt-3 me-2" onClick={openRegisterModal}>
            Signup
          </button>
        </div>
      </div>
      <div className="line"></div>
      {<p>Tere</p>}

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
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import { auth } from '../firebase';
import '../styles/Home.css';

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

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
    console.log('Login credentials:', credentials);
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    auth.signOut()
      .then(() => {
        console.log('User logged out successfully.');
      })
      .catch((error) => {
        console.error('Error during logout:', error.message);
      });
  };

  const handleRegister = async (userInfo) => {
    try {
      console.log('Registration details:', userInfo);
      setRegistrationSuccess(true);
      closeRegisterModal();
    } catch (error) {
      console.error('Error during registration:', error.message);
    } finally {
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="header-container">
        <h2 className="m-3">Airbnb Copy Pasta</h2>
        {user ? (
          <div className="text-right">
            <button className="btn btn-danger mt-3 me-2" onClick={handleLogout}>
              Logout
            </button>
            <Link to="/add-hotel">
              <button className="btn btn-primary mt-3 me-2">
                Add Hotel
              </button>
            </Link>
          </div>
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

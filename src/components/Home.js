// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, remove, get } from 'firebase/database';
import Login from '../components/Login';
import Register from '../components/Register';
import { auth, database } from '../firebase';
import '../styles/Home.css';

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const hotelsRef = ref(database, 'hotels');
    const fetchHotels = async () => {
      await onValue(hotelsRef, (snapshot) => {
        const hotelsData = [];
        snapshot.forEach((hotel) => {
          hotelsData.push({ id: hotel.key, ...hotel.val() });
        });
        setHotels(hotelsData);
      });
    };

    fetchHotels();

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

  const handleLogin = (userInfo) => {
    console.log('Login credentials:', userInfo);
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

  const handleRemoveHotel = async (hotelId) => {
    const hotelRef = ref(database, `hotels/${hotelId}`);
  
    try {
      const currentUser = auth.currentUser;
      const snapshot = await get(hotelRef);
      const hotelData = snapshot.val();

      if (currentUser && hotelData.userId === currentUser.uid) {
        await remove(hotelRef);
        console.log('Hotel removed successfully!');
      } else {
        console.log('You are not authorized to remove this hotel.');
      }
    } catch (error) {
      console.error('Error removing hotel:', error.message);
    }
  };

  return (
    <div>
      <div className="header-container m-1">
        <h2 className="m-3 mb-1">Airbnb Copy Pasta</h2>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className='mt-2'>
            {user && (
              <p className="m-2 ">Logged in as: {user.email}</p>
            )}
          </div>
          <div className="text-right">
            {user ? (
              <>
                <button className="btn btn-danger me-2 mt-3" onClick={handleLogout}>
                  Log out
                </button>
                <Link to="/add-hotel">
                  <button className="btn btn-primary me-2 mt-3">
                    Add Hotel
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button className="btn btn-primary mt-3 me-2" onClick={openLoginModal}>
                  Login
                </button>
                <button className="btn btn-success mt-3 me-2" onClick={openRegisterModal}>
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="line"></div>
  
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <Login onClose={closeLoginModal} onLogin={handleLogin} auth={auth} database={database} />
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
  
      {/* Display hotels */}
      <div className="hotel-container mt-3">
        {hotels.map((hotel) => (
          <div className="hotel-box" key={hotel.id}>
            <h3 className='mb-3'>{hotel.name}</h3>
            <p><strong>Address:</strong> {hotel.address}</p>
            <p><strong>Description:</strong> {hotel.description}</p>
            {user && hotel.userId === user.uid && (
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveHotel(hotel.id)}
              >
                Remove Hotel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



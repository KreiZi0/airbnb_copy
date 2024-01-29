// AddHotel.js
import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database, auth } from '../firebase';
import '../styles/AddHotel.css';

const AddHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearFormFields = () => {
    setHotelName('');
    setAddress('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!hotelName) {
      setError('Please enter the hotel name.');
      return;
    }
  
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not logged in.');
      return;
    }
  
    const hotelsRef = ref(database, 'hotels');
  
    try {
      setLoading(true);
  
      const newHotel = {
        name: hotelName,
        address: address,
        description: description,
        userId: user.uid // Associate hotel with user
      };
  
      await push(hotelsRef, newHotel);
  
      clearFormFields();
      setError(''); // Clear error message on successful hotel addition
      console.log('Hotel added successfully!');
    } catch (error) {
      console.error('Error adding hotel:', error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h3 className="header text-center">Add Hotel</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="add-hotel-container" onSubmit={handleSubmit}>
        <label htmlFor="hotelName">Hotel Name:</label>
        <input
          type="text"
          id="hotelName"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="form-control mb-2"
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control mb-2"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-2"
        ></textarea>

        <button type="submit" className="btn btn-primary me-2" disabled={loading}>
          {loading ? 'Adding Hotel...' : 'Add Hotel'}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;

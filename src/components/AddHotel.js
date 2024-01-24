import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';
import '../styles/AddHotel.css';

const AddHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const clearFormFields = () => {
    setHotelName('');
    setAddress('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelsRef = ref(database, 'hotels');

    try {
      const newHotel = {
        name: hotelName,
        address: address,
        description: description,
      };

      await set(hotelsRef, newHotel);

      // Clear the form fields after successful submission
      clearFormFields();

      console.log('Hotel added successfully!');
    } catch (error) {
      console.error('Error adding hotel:', error.message);
    }
  };

  return (
    <div>
      <h3 class="header" >Add Hotel</h3>
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

        <button type="submit" className="btn btn-primary me-2">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;

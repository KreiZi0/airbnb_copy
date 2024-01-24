import React, { useState } from 'react';

const AddHotel = () => {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle the submission of hotel information (e.g., send it to the server)
    // You can perform any necessary actions with the collected data

    // Clear the form fields after submission
    setHotelName('');
    setAddress('');
    setDescription('');
  };

  return (
    <div>
      <h3>Add Hotel</h3>
      <form onSubmit={handleSubmit}>
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

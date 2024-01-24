import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddHotel from './components/AddHotel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-hotel" element={<AddHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

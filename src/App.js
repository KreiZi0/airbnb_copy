// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddHotel from './components/AddHotel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function PrivateRoute({ element }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user ? element : null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add-hotel"
          element={<PrivateRoute element={<AddHotel />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

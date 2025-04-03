import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter as Router import
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EnvironmentalDataList from './components/environmentalData/EnvironmentalDataList';
import AddEnvironmentalData from './components/environmentalData/AddEnvironmentalData';
import LocationList from './components/locations/LocationList';
import AddLocation from './components/locations/AddLocation';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import './App.css'; 
function App() {
  return (
    <div> 
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/environmental-data" element={<EnvironmentalDataList />} />
          <Route path="/environmental-data/add" element={<AddEnvironmentalData />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/locations/add" element={<AddLocation />} />
          <Route path="/" element={<Dashboard />} /> {/* Set Dashboard as the default route */}
        </Routes>
      </div>
    </div> 
  );
}

export default App;

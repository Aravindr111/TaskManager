import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/homecomponents/SearchEvents';

function App() {
    return (
      <Router>
         
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Home" element={<Home/>} />          
          <Route path="/Search" element={<Search/>} />  
        </Routes>
      </Router>
    
      
    );
  }
  
  export default App;
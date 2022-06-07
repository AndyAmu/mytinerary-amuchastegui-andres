import React from 'react'
import NavBar from "./components/Navbar/NavBar"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import "./components/Styles/Carousel.css"
import "./components/Styles/Cities.css"
import Pagehome from './components/pages/Pagehome'
import { Routes, Route } from 'react-router-dom'
import { Cities } from './components/pages/Cities'



function App() {
  return (
    <>
    <NavBar />  
    <Routes>
      <Route path="/" element={<Pagehome />} />
      <Route path="/cities" element={<Cities />} />
    </Routes>
    
    <Footer />
    </>
  );
}

export default App

import React from 'react'
import NavBar from "./components/Navbar/NavBar"
import Body from "./components/Body/Body"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import "./components/Styles/Carousel.css"
import Carousel from './components/Body/Carousel'
import cities from './components/datos'




function App() {
  return (
    <>
    <NavBar />
    
    <Body />
    <Carousel datos={cities} />
    
    <Footer />
    </>
  );
}

export default App

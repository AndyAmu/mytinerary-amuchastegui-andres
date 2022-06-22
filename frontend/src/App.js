import React from 'react'
import NavBar from "./components/Navbar/NavBar"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import "./components/Styles/Carousel.css"
import "./components/Styles/Cities.css"
import "./components/Styles/Login.css"
import Pagehome from './components/pages/Pagehome'
import { Routes, Route } from 'react-router-dom'
import  Cities  from './components/pages/Cities'
import { Login } from './components/pages/Login'
import ActionAreaCard from './components/Details'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useEffect} from 'react'
import citiesActions from './redux/actions/citiesActions'
import {connect} from 'react-redux'



function App(props) {

  useEffect(() =>{
    props.getCities()
  }, [props])

  return (
    <>
    <NavBar />  
    <Routes>
      <Route path="/" element={<Pagehome />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/login" element={<Login />} />
      <Route path="/details/:id" element={<ActionAreaCard />} />
    </Routes>
    
    <Footer />
    <ScrollToTop
                style={{backgroundColor: 'white', opacity:'70%', width:'50px', height:'50px'}}                
                smooth
                viewBox="0 0 24 24"
                component={<FileUploadIcon />} />
    </>
  );
}
const mapDispatchToprops = {
  getCities: citiesActions.getCities,
}
export default connect(null,mapDispatchToprops)(App)

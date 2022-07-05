import React from 'react'
import NavBar from "./components/Navbar/NavBar"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import "./components/Styles/Carousel.css"
import "./components/Styles/Cities.css"
import "./components/Styles/Login.css"
import Pagehome from './components/pages/Pagehome'
import { Routes, Route, Navigate } from 'react-router-dom'
import  Cities  from './components/pages/Cities'
import  Login  from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import ActionAreaCard from './components/Details'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useEffect} from 'react'
import citiesActions from './redux/actions/citiesActions'
import { useDispatch} from "react-redux"
import Snackbar from './components/Snackbar'



function App() {

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(citiesActions.getCities())
    //eslint-disable-next-line
  }, [])

  return (
    <>
    <NavBar />  
    <Routes>
      <Route path="/" element={<Pagehome />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path="/details/:id" element={<ActionAreaCard />} />
      <Route path='/login' render={() => {
        return Login ? <Navigate to='/' /> : <Login />
      }} />
    </Routes>
    
    <Snackbar />
    
    <Footer />
    <ScrollToTop
                style={{backgroundColor: 'white', opacity:'70%', width:'50px', height:'50px'}}                
                smooth
                viewBox="0 0 24 24"
                component={<FileUploadIcon />} />
    </>
  );
}
export default App

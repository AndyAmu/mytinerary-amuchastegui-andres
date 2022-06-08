import {Link as LinkRouter} from "react-router-dom"
import React, {useState} from 'react'
import { Container, LogoContainer, Menu, MenuItem, MobileIcon, Wrapper } from './NavBar-Elements'
import { FaAvianex, FaAlignJustify, FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons'; // Estilos globales
import '../Styles/Navbar.css'
const NavBar = () => {
    const [showMobileMenu, setMobileMenu] = useState(false)
    return (
        <div>
            <Container>
                <Wrapper>
                    <IconContext.Provider value={{ style: {fontSize: "2em" }}}>
                    <LogoContainer>
                        <FaAvianex />
                        <p>My</p>
                        <p className='TineraryBody'>Tinerary</p>                        
                    </LogoContainer>

                    <MobileIcon onClick = {() => setMobileMenu(!showMobileMenu)}>
                        <FaAlignJustify />
                    </MobileIcon>

                    <Menu className="menu" open= {showMobileMenu}>
                        <MenuItem>
                        <div className="MenuItemLink">
                        <LinkRouter style={{color:"white"}} className='LinkRouter'  to='/'>Home</LinkRouter>
                        </div>
                            
                        </MenuItem>
                        <MenuItem>
                        <div className="MenuItemLink">
                            <LinkRouter style={{color:"white"}} className='LinkRouter'  to='/Cities'>Cities</LinkRouter>
                        </div>
                        </MenuItem>
                        <MenuItem>
                            <div className="MenuItemLink">
                            <LinkRouter style={{color:"white"}} className='LinkRouter'  to='/Login'><FaUserCircle /></LinkRouter>
                            </div>
                            
                        </MenuItem>
                    </Menu>
                    </IconContext.Provider>
                </Wrapper>
            </Container>
        </div>
    )
}

export default NavBar
import {Link as LinkRouter} from "react-router-dom"
import React, {useState} from 'react'
import { Container, LogoContainer, Menu, MenuItem, MenuItemLink, MobileIcon, Wrapper } from './NavBar-Elements'
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
                        <LinkRouter  to='/'>
                        <FaAvianex />
                        </LinkRouter>
                        <p>My</p>
                        <p>Tinerary</p>                        
                    </LogoContainer>

                    <MobileIcon onClick = {() => setMobileMenu(!showMobileMenu)}>
                        <FaAlignJustify />
                    </MobileIcon>

                    <Menu open= {showMobileMenu}>
                        <MenuItem>
                        <MenuItemLink>
                        <LinkRouter onClick = {() => setMobileMenu(!showMobileMenu)} style={{color:"white"}} className='LinkRouter'  to='/'>Home</LinkRouter>
                        </MenuItemLink>
                            
                        </MenuItem>
                        <MenuItem>
                        <MenuItemLink>
                            <LinkRouter onClick = {() => setMobileMenu(!showMobileMenu)} style={{color:"white"}} className='LinkRouter'  to='/Cities'>Cities</LinkRouter>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink>
                            <LinkRouter onClick = {() => setMobileMenu(!showMobileMenu)} style={{color:"white"}} className='LinkRouter'  to='/Login'><FaUserCircle /></LinkRouter>
                            </MenuItemLink>
                            
                        </MenuItem>
                    </Menu>
                    </IconContext.Provider>
                </Wrapper>
            </Container>
        </div>
    )
}

export default NavBar
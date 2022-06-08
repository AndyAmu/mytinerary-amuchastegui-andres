import {Link as LinkRouter} from "react-router-dom"

import React, {useState} from 'react'
import { Container, LogoContainer, Menu, MenuItem, MenuItemLink, MobileIcon, Wrapper } from './NavBar-Elements'
import { FaAvianex, FaAlignJustify, FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons'; // Estilos globales
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

                    <Menu open= {showMobileMenu}>
                        <MenuItem>
                            <MenuItemLink className='navegador' onClick = {() => setMobileMenu(!showMobileMenu)}>
                            <LinkRouter className='LinkRouter'  to='/'>Home</LinkRouter>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink className='navegador' onClick = {() => setMobileMenu(!showMobileMenu)}>
                            <LinkRouter className='LinkRouter'  to='/Cities'>Cities</LinkRouter>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink onClick = {() => setMobileMenu(!showMobileMenu)}>
                            <div>
                            <LinkRouter className='LinkRouter'  to='/Login'><FaUserCircle /></LinkRouter>
                            </div>
                                
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
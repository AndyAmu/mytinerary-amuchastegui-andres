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
                                Home
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink className='navegador' onClick = {() => setMobileMenu(!showMobileMenu)}>
                                Cities
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem>
                            <MenuItemLink onClick = {() => setMobileMenu(!showMobileMenu)}>
                            <div>
                                <FaUserCircle />
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
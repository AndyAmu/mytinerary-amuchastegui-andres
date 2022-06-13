import styled from 'styled-components'

export const Container = styled.div`
    z-index: 10;
    position: static;
    width: 100%;
    height: 10vh;
    background-color: black;
    `;
export const Wrapper = styled.div`
    margin-left: 2rem;
    width: 100%;
    max-width: 1300px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto`;;

export const LogoContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-family: sans-serif;

    p {
        &:nth-child(2){
            color: #fff;
        }

        &:nth-child(3){
            font-size: 1.5rem;
            font-weight: 500;
            color: #ffc107;
    }
}
    svg{
        fill: #ffc107;
        margin-right: 1rem;
    }
`;

export const Menu = styled.ul`
    height: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;

    @media screen and (max-width: 960px){
        background-color: black;
        position: absolute;
        top: 70px;
        right: ${({open}) => (open ? "0" : "-100%")}; // Muy importante
        width: 100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
        z-index: 1;
        
    }
    
`; 

export const MenuItem = styled.li`
    height: 100%;
    
    @media screen and (max-width: 960px) {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MenuItemLink = styled.a`
    display: flex;
    justify-content: center;
    align-items:center;
    height: 100%;
    padding: 0.5rem 2.5rem;
    color: #ffc107;
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    transition: 0.5s all ease;

    &:hover{
        color: #fff;
        background-color: #ffc107;
        transition: 0.5s all ease;

        div {
            svg{
            fill :#23394d ;
            }
        }
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export const MobileIcon = styled.div`
    display: none;
    
    @media screen and (max-width: 960px){
        display: flex;
        align-items: center;
        cursor: pointer;

    svg{
        fill: #ffc107;
        margin-right: 1rem;
        }
    }
`;
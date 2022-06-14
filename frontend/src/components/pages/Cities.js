import React, { useEffect, useState } from 'react'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';
import datos from '../datos'
import {Link as LinkRouter} from 'react-router-dom'
import Box from '@mui/material/Box';


export default function TitlebarImageList() {
    const [search, setSearch] = useState ('')
    const [cities, setCities] = useState ([])

    useEffect(() => {
        setCities(datos)

        let city = datos.filter(city => city.ciudad.toLowerCase().startsWith(search.trim().toLowerCase()))
        setCities(city)
    }, [search])

    return (
        
        <div className='contenedor-cities'>
            
        <ImageList sx={{gap:'40px!important', paddingTop: "8rem", marginLeft: "15%", width: "70%" }}>
            
            <ImageListItem  key="Subheader" cols={2}>
                <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '2rem', }}>
            <input className='input' onKeyUp={(e) => {setSearch(e.target.value)}} placeholder='Search City' type='text'></input>
            </Box>
            <ListSubheader sx={{borderRadius: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.623)', color: 'white', textAlign: 'center'}} component="div">Cities</ListSubheader>
            </ImageListItem>
            {cities.map((item) => (
                <ImageListItem key={item.imagen}>
                    <img className='img-cities1'
                        src={`${item.imagen}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.ciudad}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.ciudad}
                        subtitle={item.pais}
                        actionIcon={
                            <LinkRouter to={`/Details/${item.id}`}>
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.ciudad}`}
                            >

                                <InfoIcon />
                            </IconButton>
                            </LinkRouter>
                        }
                    />
                </ImageListItem>
            ))}
            
        </ImageList>
        </div>
        
    );


}
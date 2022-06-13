import React, { useEffect, useState } from 'react'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';
import datos from '../datos'
import {Link as LinkRouter} from 'react-router-dom'
import { textAlign } from '@mui/system';

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
            
        <ImageList sx={{paddingTop: "10rem", marginLeft: "5%", width: "90%" }}>
            <div>
                <input onKeyUp={(e) => {setSearch(e.target.value)}} placeholder='Search' type='text'></input>
            </div>
            <ImageListItem  key="Subheader" cols={2}>
            <ListSubheader sx={{backgroundColor: 'black', color: 'white', textAlign: 'center'}} component="div">Cities</ListSubheader>
            </ImageListItem>
            {cities.map((item) => (
                <ImageListItem key={item.imagen}>
                    <img className='img-cities'
                        src={`${item.imagen}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.imagen}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.ciudad}
                        loading="lazy"
                    />
                    <ImageListItemBar className='img-cities'
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
import * as React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';
// import datos from '../datos'
import { Link as LinkRouter } from 'react-router-dom'
import Box from '@mui/material/Box';
import axios from 'axios'



export default function TitlebarImageList() {


    const [cities, setcities] = React.useState([])
    const [search, setSearch] = React.useState('')


    React.useEffect(() => {
        axios.get("http://localhost:4000/api/cities")

            .then(response => {

                setcities(response.data.response.cities)
            })

    }, [])

    let city = cities.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))


    return (
        <div className='contenedor-cities'>

            <ImageList sx={{ gap: '40px!important', paddingTop: "8rem", marginLeft: "15%", width: "70%" }}>

                <ImageListItem key="Subheader" cols={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', }}>
                        <input className='input' onKeyUp={(e) => { setSearch(e.target.value) }} placeholder='Search City' type='text'></input>
                    </Box>
                    <ListSubheader sx={{ borderRadius: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.623)', color: 'white', textAlign: 'center' }} component="div">Cities</ListSubheader>
                </ImageListItem>
                {city.map((item) => (
                    <ImageListItem key={item.image}>
                        <img className='img-cities1'
                            src={`${item.image}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.country}
                            actionIcon={
                                <LinkRouter to={`/Details/${item._id}`}>
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.name}`}
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


    )

}
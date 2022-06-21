import '../estilos/App.css';
import "swiper/css/bundle";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link as LinkRouter } from "react-router-dom"



function Card({ cardFilter }) {


    return (
        <div >
            <div>
                <h1 className='titleCities'>Find your perfect trip</h1>
            </div>
            <ImageList className='citiesBody' sx={{ width: '100%', height: '100%', gap: '30px !important', padding: '2rem' }}>

                <ImageListItem key="Subheader" cols={2}>

                </ImageListItem>
                {cardFilter.map((item) => (
                    <ImageListItem key={item.image}>
                        <img
                            src={`${item.image}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.country}
                            actionIcon={
                                <LinkRouter to={`/city/${item._id}`}> <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                >
                                    <InfoIcon />
                                </IconButton></LinkRouter>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}
export default Card;
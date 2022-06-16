import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {useParams} from 'react-router-dom'
// import cities from './datos'
import '../components/Styles/Details.css'
import axios from 'axios'
import { useEffect } from 'react';
import {Link as LinkRouter} from "react-router-dom"


export default function ActionAreaCard() {
    const {id}=useParams()
    const [card,setCity] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/cities/${id}`)
        .then(response => setCity(response.data.response.city))},)

    
    return (
        <div key={card._id} className='details-contenedor'>
        <Card key='index' sx={{maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="350"
                    image={card.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                        
                    </Typography>
                    <p>{card.description}</p>
                    
                </CardContent>
                <LinkRouter style={{textDecoration:'none', textAlign: 'center', color: '#ffc107'}} to='/Cities'><p>Return to Cities</p></LinkRouter>
            </CardActionArea>
        </Card>
        </div>
        )
    ;
}
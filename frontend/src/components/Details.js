import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {useParams} from 'react-router-dom'
import cities from './datos'


export default function ActionAreaCard() {
    const {id}=useParams()
    const [card, setCard] = useState(cities.filter(data => data.id == id))
    console.log(setCard)

    return (
        card.map((e, index) => 
        <Card key='index' sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={e.imagen}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {e.ciudad}
                    </Typography>
                    
                </CardContent>
            </CardActionArea>
        </Card>
        )
    );
}

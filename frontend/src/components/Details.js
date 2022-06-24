import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {useParams} from 'react-router-dom'
import '../components/Styles/Details.css'
// import axios from 'axios'
import { useEffect } from 'react';
import {Link as LinkRouter} from "react-router-dom"
import { useDispatch } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import { useSelector } from 'react-redux';
import Itineraries from './Itineraries';

export default function ActionAreaCard() {
    const {id}=useParams()
    // const [card,setCity] = useState([])
    const dispatch = useDispatch()

    // useEffect(() => {
    //     axios.get(`http://localhost:4000/api/cities/${id}`)
    //     .then(response => setCity(response.data.response.city) )
        
    // },)

    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        // eslint-disable-next-line
    }, [id])
        
    const card = useSelector(store => store.citiesReducer.oneCity)

    return (
        <>
        <div className='contenedor-details'> 
        <div key={card._id} className='details-contenedor'>
        <Card key='index'>
            <CardActionArea sx={{backgroundColor: "#1b1919"}}>
                <CardMedia
                    className='card-details'
                    component="img"
                    height="500"
                    image={card.image}
                    alt={card.name}
                />
                <CardContent>
                    <Typography style={{color: "white"}} gutterBottom variant="h5" component="div">
                        {card.name}
                        
                    </Typography>
                    <p style={{color: "white"}}>{card.description}</p>
                    
                </CardContent>
                <LinkRouter style={{textDecoration:'none', textAlign: 'center', color: '#ffc107'}} to='/Cities'><p>Return to Cities</p></LinkRouter>
            </CardActionArea>
        </Card>
        
        
        </div>
        <div>
            <Itineraries /> 
        </div>
        </div>
        
        </>
        )
    ;
}


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import itinerariesActions from '../redux/actions/itinerariesActions';
import '../components/Styles/Itineraries.css'
import { Box } from '@mui/system';
import NotItinerarios from './NotItineraries';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Itineraries() {


    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(id))
        // eslint-disable-next-line
    }, [])

    const itinerary = useSelector(store => store.itinerariesReducer.getItinerariesFromCity)
    console.log(itinerary)


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (itinerary.length > 0 ?
        itinerary.map((item, index) =>
            <Box key={index}>
                <Card className='card-itineraries' sx={{height: "100%", backgroundColor: "#1b1919", color: "white" }}>

                    <Typography sx={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem", marginTop: "1rem" }}>{item.title}</Typography>

                    <CardMedia
                        sx={{borderRadius: "50%", height: "10rem", width: "10rem" }}
                        className='img-profile'
                        component="img"
                        image={item.profilePic}

                    />
                    <Typography>{item.profilename}</Typography>

                    <CardContent>

                        <Typography sx={{ color: "white", textAlign: "center" }} variant="body2" color="text.secondary">

                            {item.price},
                        </Typography>
                        <Typography sx={{ color: "white", textAlign: "center" }} variant="body2" color="text.secondary">
                            {item.hours},
                        </Typography>

                        <Typography sx={{ color: "blue", textAlign: "center" }} variant="body2" color="text.secondary">

                            {item.hashtag}
                        </Typography>

                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton sx={{ color: "white" }} aria-label="add to favorites">
                            <FavoriteIcon sx={{ color: "rgb(206, 26, 26)" }} />

                        </IconButton>
                        {item.likes}
                        <IconButton sx={{ color: "white" }} aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            sx={{ color: "white" }}
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{item.activities}</Typography>

                        </CardContent>
                    </Collapse>
                </Card>

            </Box>) : (<NotItinerarios />)

    
    );
}
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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


    const {id} = useParams()
    const dispatch =useDispatch()
    useEffect(() => {
        dispatch(itinerariesActions.getItinerariesByCity(id))
        // eslint-disable-next-line
    },[])

    const itinerary = useSelector(store=> store.itinerariesReducer.getItinerariesFromCity)
    console.log(itinerary)


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        itinerary.map((item, index) => 
        <Card key={index}  sx={{ width: "90vh", height: "100%", backgroundColor: "black", color: "white" }}>
            <CardHeader
                
                
            />
            <Typography>{item.title}</Typography>
            <CardMedia

                component="img"
                height="200"
                image={item.profilePic}
                
            />
            <Typography>{item.profilename}</Typography>
            <CardContent>
                <Typography sx={{color: "white"}} variant="body2" color="text.secondary">
                
                {item.price},
                {item.hours},
                {item.hashtag}
                    
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton sx={{color: "white"}}  aria-label="add to favorites">
                    <FavoriteIcon sx={{color: "red"}} />
                    
                </IconButton> 
                {item.likes}
                <IconButton sx={{color: "white"}} aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    sx={{color: "white"}}
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
    )
    );
}
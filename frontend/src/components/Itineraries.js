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
import '../components/Styles/Itineraries.css'
import { Box } from '@mui/system';
import Activities from './Activities'
import { useDispatch } from 'react-redux';

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



export default function Itineraries(props) {


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <Card className='card-itineraries' sx={{ height: "100%", backgroundColor: "#1b1919", color: "white" }}>

                <Typography sx={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem", marginTop: "1rem" }}>{props.title}</Typography>

                <CardMedia
                    sx={{ borderRadius: "50%", height: "10rem", width: "10rem" }}
                    className='img-profile'
                    component="img"
                    image={props.profilePic}

                />
                <Typography>{props.profilename}</Typography>

                <CardContent>

                    <Typography sx={{ color: "white", textAlign: "center" }} variant="body2" color="text.secondary">

                        {props.price},
                    </Typography>
                    <Typography sx={{ color: "white", textAlign: "center" }} variant="body2" color="text.secondary">
                        {props.hours},
                    </Typography>

                    <Typography sx={{ color: "blue", textAlign: "center" }} variant="body2" color="text.secondary">

                        {props.hashtag}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton sx={{ color: "white" }} aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: "rgb(206, 26, 26)" }} />

                    </IconButton>
                    {props.likes}
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
                    <CardContent className='card-content'>
                        
                    {props.activitiesId.length > 0 ?
                        
                        <Activities activitiesId={props.activitiesId} />                         
                        : 
                        <Box>
                            <Typography variant='h3'>There are no itineraries at the moment</Typography>
                        </Box>}
                        

                    </CardContent>
                </Collapse>
            </Card>

        </Box>


    );
}
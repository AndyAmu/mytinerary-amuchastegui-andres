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
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../components/Styles/Itineraries.css'
import { Box } from '@mui/system';
import Activities from './Activities'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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



function Itineraries(props) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [reload, setReload] = useState(false)
    const [likes, setLikes] = useState(props.likes)

    const user = useSelector(store => store.userReducer.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itinerariesActions.getOneItinerary(props.id))
            .then(response => setLikes(response.likes))
        //eslint-disable-next-line
    }, [!reload])

    // console.log(props)

    const like = async (event) => {
        event.preventDefault();
        await dispatch(itinerariesActions.likeDislike(props.id))
        setReload(!reload)
    }

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

                    <Typography sx={{ fontSize: '1rem', color: "white", textAlign: "center" }} variant="body2" color="text.secondary">

                        {props.price}ㅤㅤㅤㅤㅤㅤ

                        {props.hours}

                    </Typography>

                    <Typography sx={{ color: "#ffc107", textAlign: "center", padding: "1rem", letterSpacing: "3pt", marginTop: '1rem' }} variant="body2" color="text.secondary">

                        {props.hashtag}
                    </Typography>

                </CardContent>

                <CardActions disableSpacing>

                    {user ?
                        <IconButton onClick={like}>
                            {likes.includes(user.id) ?
                                <FavoriteIcon sx={{ color: 'red' }} /> :
                                <FavoriteBorderIcon sx={{ color: 'white' }} />}
                            <Typography sx={{ color: 'white', marginLeft: '.4rem' }}> {likes.length} </Typography>
                        </IconButton>
                        :
                        <IconButton>
                            <FavoriteBorderIcon sx={{ color: 'white' }} />
                            <Typography sx={{ color: 'white', marginLeft: '.4rem' }}> {likes.length} </Typography>

                        </IconButton>
                    }
                    {/* <IconButton sx={{ color: "white" }} aria-label="share">
                        <ShareIcon />
                    </IconButton> */}

                    <ExpandMore
                        sx={{ color: "white" }}
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    Activities
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


                    <Box>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', color: 'black', fontSize: '1.4rem', marginBottom: '2rem' }}>Comment</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', color: 'black', height: '10rem' }}>
                        {props.user ?
                            <Avatar src={props.user.photoUser} sx={{ width: '40px', height: '40px', marginLeft:'2rem' }} /> :
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" size="lg" />}

                        <Typography sx={{ color: 'black', fontSize: '1.4rem'}}>Comentario mandado</Typography>
                        <Box sx={{marginRight: '2rem'}}>
                        <Button sx={{margin: '1rem'}} variant="outlined" color="success">

                            <EditIcon></EditIcon>
                        </Button>
                        <Button variant="outlined" color="error">
                            <DeleteIcon />
                        </Button>
                        </Box>

                    </Box>
                    <Box>Aca poner elcomentario</Box>
                </Collapse>

            </Card>

        </Box>


    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, null)(Itineraries)
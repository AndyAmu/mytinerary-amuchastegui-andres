import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as LinkRouter} from "react-router-dom"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FacebookLoginButton } from "react-social-login-buttons";
import '../Styles/Login.css'
import { Link } from '@mui/material';
import { useDispatch} from 'react-redux';
import userActions from '../../redux/actions/userActions';
import {useState} from 'react';
import GoogleSignIn from '../GoogleSignIn';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <LinkRouter color="inherit" to="/">
                MyTinerary
            </LinkRouter>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    // const [from,setFrom]= useState("");

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const logedData = {

            email: email,
            password: password,
            from: "form-SignUp",
    }

    console.log(logedData)
    dispatch(userActions.signInUser(logedData))

    setEmail("")
    setPassword("")
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '92vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://r4.wallpaperflare.com/wallpaper/875/239/803/nature-sunset-sun-beach-wallpaper-696048dd818aad5b46d7986f100116ad.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 , backgroundColor: 'rgb(27, 25, 25)'}}
                            >
                                Sign In
                            </Button>
                            <Grid sx={{display: 'flex', justifyContent: 'center', margin: '1rem'}}>
                            <GoogleSignIn /> 
                            
                            </Grid>
                            <Grid sx={{display: 'flex', justifyContent: 'center', margin: '1rem'}}>
                            <FacebookLoginButton className='facebook' onClick={() => { console.log('Facebook button clicked') }}>
                            <span>Sign in with Facebook</span>
                            </FacebookLoginButton>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <LinkRouter to='/signup' variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </LinkRouter>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
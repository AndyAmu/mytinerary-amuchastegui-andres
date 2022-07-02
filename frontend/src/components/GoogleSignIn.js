import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'


export default function GoogleSignIn() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(userActions.signInUser({

                email: userObject.email,
                from: 'google',
                password: userObject.sub
            

        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '603076230779-1sch3rod74rrt1u3ql2akur0ilkhb15c.apps.googleusercontent.com',
            callback: handleCallbackResponse
                });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium", locale: "en" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}
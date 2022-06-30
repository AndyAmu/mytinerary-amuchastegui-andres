import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'


export default function GoogleSignUp() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(userActions.signInUser({
            userData: {
                email: userObject.email,
                from: 'google',
                password: userObject.sub
            }

        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '603076230779-8snttgr541flvnnc669hbhasn8qlvjij.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}
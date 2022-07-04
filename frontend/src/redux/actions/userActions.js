import axios from 'axios'
// import apiUrl from '../../url'


const userActions = {

    signUp: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signUp', { userData })
                // console.log(userData)
                // console.log(res)
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },


    signInUser: (logedData) => {
        //console.log(userLogin)
        return async (dispatch, getState) => {

            const res = await axios.post('http://localhost:4000/api/auth/signIn', { logedData })
            // console.log(res)

            if (res.data.success) {
                localStorage.setItem('token', res.data.response.token)
                dispatch({
                    type: 'user',
                    payload: res.data.response.userData
                })
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            } else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                });
            }
        }
    },

    signOut: (userData) => {
        console.log(userData)
        // console.log('here userdata')
        return async (dispatch, getState) => {
            await axios.post('http://localhost:4000/api/auth/signOut', { userData })
            localStorage.removeItem('token')

            dispatch({
                type: 'user',
                payload: null
            })
        }
    },
    verificationToken: (token) => {
        return async (dispatch, getState) => {
            //console.log(token)
            const user = await axios.get('http://localhost:4000/api/auth/loginToken', {headers: {'Authorization': 'Bearer '+token}} )
            //console.log(userData)
            if (user.data.success) {
                dispatch({
                    type: 'user',
                    payload: user.data.response
                })
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: user.data.message,
                        success: user.data.success
                    }
                })
            } else {
                localStorage.removeItem('token')
            }
        }
    },

}

export default userActions
import axios from 'axios'
// import apiUrl from '../../url'


const userActions = {

    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signUp', {userData})
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
            } catch(error) {
                console.log(error)
            }
        }
    },

    signInUser: (logedData) => {
        //console.log(userLogin)
        return async (dispatch, getState) => {

            const res = await axios.post('http://localhost:4000/api/auth/signIn', {logedData})
            console.log(res)
            
            if(res.data.success) {
                localStorage.setItem('token',res.data.response.token)
                dispatch({
                    type: 'user',
                    payload: res.data.response.userData})
                    dispatch({type: 'userList'})
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
        console.log('aca este el userdata')
        return async (dispatch, getState) => {
            await axios.post('http://localhost:4000/api/auth/signOut',{...userData})       
            localStorage.removeItem('token')
            
            dispatch({
                type:'USER',
                payload:null
            })
        }   
    },


    VerificarToken: (token) => {
        

        return async (dispatch, getState) => {

            await axios.get('http://localhost:4000/api/auth/signInToken', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response });
                        dispatch({type:'userList'})
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        });
                    } else {
                        localStorage.removeItem('token')
                    }
                }
                ).catch(error => {
                    if (error.response.status === 401)
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: "Please signIn again",
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
                console.log(token)
        }
        
    }
    
}

export default userActions
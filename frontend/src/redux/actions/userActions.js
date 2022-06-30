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
                    payload: res.data.response.userData
                })
            } else {
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
        } 
    }

}

export default userActions
import axios from 'axios'
// import apiUrl from '../../url'


const userActions = {

    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signUp', {userData})
                console.log(res)
                dispatch({
                    type: 'MESSAGE',
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

    signIn: (logedData) => {
        
        return async(dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signIn/auth/signIn', {logedData})
                console.log(res)
                if (res.data.success) {
                    dispatch({type: 'USER', payload: res.data.response})
                } else {
                    dispatch({type: 'MESSAGE',
                        payload: {
                            view: true,
                            message: res.data.message,
                            success: res.data.success
                        }
                    })
                }
                return res
            } catch(error) {
                console.log(error)
            }
        }
    }

}

export default userActions
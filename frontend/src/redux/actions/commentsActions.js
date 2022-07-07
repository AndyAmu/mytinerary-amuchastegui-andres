import axios from 'axios';

const commentsActions = {

    addComment: (comment) => {

    const token = localStorage.getItem('token')
    return async (dispatch, getState) =>{
        if (comment.comment !== "") { // para que no comente vacio
            const res = await axios.post('http://localhost:4000/api/itineraries/comment', {comment},{
                headers: {
                    'Authorization': `Beares ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
        else {
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: 'Enter comment to save',
                    success: false

                }
            })
        }
    }
},

modifyComment: (comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) =>{
            const res = await axios.post('http://localhost:4000/api/itineraries/comment', {comment},{
                headers: {
                    'Authorization': `Beares ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res // No lo trabajo desde redux, en esta instancia no los necestio tener en el ambiente glolbal, porque las acciones se desprenden desde el mismo componente que las va a realizar

        }
    },

    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) =>{
            const res = await axios.post(`http://localhost:4000/api/itineraries/comment/${id}`, {}, { //Le paso datos por params(id) id del comentario que quiero elimiar
                headers: {
                    'Authorization': `Beares ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
        })
        return res
    }
},

}
export default commentsActions
import axios from 'axios'

const citiesActions = {
    getCities:() => {
        return async(dispatch, getstate) => {
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'GETCITIES', payload:res.data.response.cities})
        }
    }
}
export default citiesActions
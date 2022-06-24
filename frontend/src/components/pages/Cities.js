import * as React from 'react';
import Box from '@mui/material/Box';
// import axios from 'axios'
import Card from '../Card'
import Notfound from '../Notfound';
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../../redux/actions/citiesActions';


function Cities() {
// const [inputValue, setInputValue] = useState("")
    const [search, setSearch] = React.useState('')

    
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(citiesActions.filterCities(search))
        // eslint-disable-next-line
    }, [search])

    const city = useSelector(store => store.citiesReducer.filter)

    // let city = props.cities?.filter(city => city.name.toLowerCase().startsWith(search.trim().toLowerCase()))

    return (

        <div className='contenedor-cities'>
            <Box className='buscador' sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', }}>
                <input className='input' onKeyUp={(e) => { setSearch(e.target.value) }} placeholder='Search City' type='text'></input>
            </Box>


            <Box>
                {city?.length > 0 ? (<Card filterCard={city} />) : (<Notfound />)}
            </Box>
        </div>

    )

}
// const mapStateToProps = (state) => {
//     return {
//         cities: state.citiesReducer.cities,
//         auxiliar: state.citiesReducer.auxiliar
//     }
// }
export default Cities
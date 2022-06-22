const initialState = {
    cities: [],
    auxiliar: []
}

const citiesReducer = (state = initialState, action) => {

    switch(action.type){
        case "GETCITIES":
            return{
                ...state,
                cities: action.payload,
                auxiliar: action.payload
            }
            default:
                return state
    }
}
export default citiesReducer
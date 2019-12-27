import { FETCH_API, FETCH_RESPONSE, FETCH_FAILURE } from '../actions/type.js'

const initState = {
    data: null,
    error: "",
    isLoading: false
}

export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_API:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_RESPONSE:
            return {
                ...state,
                isLoading: false,
                data: action.data
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error
            }
        default:
            return state
    }
}
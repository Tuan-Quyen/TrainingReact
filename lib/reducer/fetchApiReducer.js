import { FETCH_API, FETCH_RESPONSE, FETCH_FAILURE, LOAD_MORE_PAGE, REFRESH_PAGE } from '../actions/type.js'

const initState = {
    data: null,
    error: "",
    isLoading: false,
    page: 1,
    totalPage: 0
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
                data: state.data != null ? [...state.data, ...action.data] : action.data,
                totalPage: action.totalPage
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: null,
                error: action.error
            }
        case LOAD_MORE_PAGE:
            return {
                ...state,
                page: action.page
            }
        case REFRESH_PAGE:
            return {
                ...state,
                page: 1,
                data: null
            }
        default:
            return state
    }
}
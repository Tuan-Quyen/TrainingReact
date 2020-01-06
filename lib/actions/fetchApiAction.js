import { FETCH_API, FETCH_RESPONSE, FETCH_FAILURE, LOAD_MORE_PAGE, REFRESH_PAGE } from './type'
import { BASE_URL, API_KEY } from '../baseApi'

export const fetchData = (page) => {
    return (dispatch) => {
        dispatch(getData())
        return (fetch(BASE_URL + 'movie/popular?language=en-US&page=' + page + '&api_key=' + API_KEY))
            .then(res => res.json())
            .then(json => {
                // JSON.stringify //parse object json to type string data json
                // JSON.parse //parse string data json to type object json
                if (page != 1)
                    return (dispatch(loadMorePage(json)))
                else
                    return (dispatch(onResponse(json)))
            })
            .catch(error => dispatch(onFailed(error)))
    }
}

export const refreshPage = () => {
    return {
        type: REFRESH_PAGE
    }
}

export const loadMorePage = (json) => {
    return {
        type: LOAD_MORE_PAGE,
        data: json.results
    }
}

function getData() {
    return {
        type: FETCH_API
    }
}

function onResponse(json) {
    return {
        type: FETCH_RESPONSE,
        data: json.results,
        totalPage: json.total_pages
    }
}

function onFailed(error) {
    return {
        type: FETCH_FAILURE,
        error: error
    }
}
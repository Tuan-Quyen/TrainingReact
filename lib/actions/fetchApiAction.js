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
                if(json.status_code != null){
                    return (dispatch(onFailed(json.status_message)))
                }else{
                    return (dispatch(onResponse(json)))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(onFailed(error))
            })
    }
}

export const refreshPage = () => {
    return (dispatch) => {
        dispatch(fetchData(1))
        return (dispatch({
            type: REFRESH_PAGE
        }))
    }
}

export const loadMorePage = (page) => {
    return (dispatch) => {
        dispatch(fetchData(page + 1))
        return (dispatch({
            type: LOAD_MORE_PAGE,
            page: page + 1
        }))
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
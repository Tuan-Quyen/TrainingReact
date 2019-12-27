import { FETCH_API, FETCH_RESPONSE, FETCH_FAILURE } from './type'

export const fetchData = () => {
    return (dispatch) => {
        dispatch(getData())
        return (fetch('https://facebook.github.io/react-native/movies.json'))
            .then(res => res.json())
            .then(json => {
                // JSON.stringify //parse object json to type string data json
                // JSON.parse //parse string data json to type object json
                return (dispatch(onResponse(json)))
            })
            .catch(error => dispatch(onFailed(error)))
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
        data: json
    }
}

function onFailed(error) {
    return {
        type: FETCH_FAILURE,
        error: error
    }
}
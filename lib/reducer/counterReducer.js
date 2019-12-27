import { INCREASE_COUNT, DECREASE_COUNT, INPUT_VALUE } from '../actions/type.js'

const initState = {
    counter: 0,
    inputValue: 1
}

export default function (state = initState, action) {
    switch (action.type) {
        case INCREASE_COUNT:
            return {
                ...state,
                counter: state.counter + state.inputValue
            }
        case DECREASE_COUNT:
            return {
                ...state,
                counter: state.counter - state.inputValue
            }
        case INPUT_VALUE:
            return {
                ...state,
                inputValue: Number(action.value)
            }
        default:
            return state
    }
}
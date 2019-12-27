import { INCREASE_COUNT, DECREASE_COUNT, INPUT_VALUE } from './type'

export const increaseAction = () => {
    return {
        type: INCREASE_COUNT
    }
}

export const decreaseAction = () => {
    return {
        type: DECREASE_COUNT
    }
}

export const inputValueCount = (value) => {
    return {
        type: INPUT_VALUE,
        value: value
    }
}
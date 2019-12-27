import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import fetchApiReducer from './fetchApiReducer';

const allReducers = combineReducers({
    count: counterReducer,
    fetch: fetchApiReducer
});
export default allReducers;

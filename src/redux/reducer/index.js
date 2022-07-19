import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';

const reducer = combineReducers({
    registerReducer,
    globalReducer,
    photoReducer,
});

export default reducer;

import {combineReducers} from 'redux';
import {registerReducer, photoReducer} from './auth';
import {globalReducer} from './global';
import {homeReducer} from './home';

const reducer = combineReducers({
    registerReducer,
    globalReducer,
    homeReducer,
    photoReducer,
});

export default reducer;

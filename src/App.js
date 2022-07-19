import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import Router from './router';
import store from './redux/store';
import {Loading} from './components';

const MainApp = () => {
    const {isLoading} = useSelector(state => state.globalReducer);
    return (
        <NavigationContainer>
            <Router />
            <FlashMessage position="top" />
            {isLoading && <Loading />}
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    );
};
export default App;

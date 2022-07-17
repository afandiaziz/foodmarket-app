import React from 'react';
import {SignIn, SplashScreen} from './pages';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <SignIn />
            {/* <SplashScreen /> */}
        </NavigationContainer>
    );
};
export default App;

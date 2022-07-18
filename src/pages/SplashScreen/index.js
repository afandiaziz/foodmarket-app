import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Logo} from '../../assets';

export default function SplashScreen({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn');
        }, 500);
    }, []);

    return (
        <View
            style={{
                backgroundColor: '#ffc700',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Logo />
            <View style={{height: 38}} />
            <Text
                style={{
                    fontSize: 32,
                    color: '#020202',
                    fontFamily: 'Poppins-Medium',
                }}>
                FoodMarket
            </Text>
        </View>
    );
}

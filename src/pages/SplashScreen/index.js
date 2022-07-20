import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Logo} from '../../assets';
import {getData} from '../../utils';

export default function SplashScreen({navigation}) {
    useEffect(() => {
        setTimeout(() => {
            getData('token').then(res => {
                if (res) {
                    navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
                } else {
                    navigation.replace('SignIn');
                }
            });
        }, 1000);
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

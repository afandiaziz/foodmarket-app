import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProfileDummy} from '../../assets';

export default function Home() {
    return (
        <View>
            <View style={styles.profileContainer}>
                <View>
                    <Text style={styles.appName}>FoodMarket</Text>
                    <Text style={styles.desc}>Let’s get some foods</Text>
                </View>
                <Image source={ProfileDummy} style={styles.profile} />
            </View>
            <Text>index</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
    },
    appName: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
    },
    desc: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
});

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../../../utils';

export default function HomeProfile() {
    const navigation = useNavigation();
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            getData('userProfile').then(
                ({profile_photo_path, profile_photo_url}) => {
                    if (profile_photo_path) {
                        setPhoto({uri: profile_photo_url});
                    }
                },
            );
        });
    }, [navigation]);

    return (
        <View style={styles.profileContainer}>
            <View>
                <Text style={styles.appName}>WIZZ Food</Text>
                <Text style={styles.desc}>Let’s get some foods</Text>
            </View>
            {photo && <Image source={photo} style={styles.profile} />}
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

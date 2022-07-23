import {getData} from '../../utils';
import {ItemListMenu} from '../../components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import asyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
    const [userProfile, setUserProfile] = useState({});

    const updateUserProfile = () => {
        getData('userProfile').then(res => {
            setUserProfile(res);
        });
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            updateUserProfile();
        });
    }, [navigation]);

    const signOut = () => {
        asyncStorage.multiRemove(['userProfile', 'token']).then(() => {
            navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
        });
    };

    return (
        <View style={styles.page}>
            <View style={styles.profileDetail}>
                <View style={styles.photo}>
                    <View style={styles.borderPhoto}>
                        <Image
                            source={{uri: userProfile.profile_photo_url}}
                            style={styles.photoContainer}
                        />
                    </View>
                </View>
                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.email}>{userProfile.email}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.containerAccount}>
                    <ItemListMenu
                        text="Edit Profile"
                        onPress={() =>
                            navigation.navigate('EditProfile', userProfile)
                        }
                    />
                    <ItemListMenu
                        text="Home Address"
                        onPress={() =>
                            navigation.navigate('EditAddress', userProfile)
                        }
                    />
                    <ItemListMenu text="Security" />
                    <ItemListMenu text="Payments" />
                    <ItemListMenu text="Sign Out" onPress={signOut} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 24,
    },
    profileDetail: {
        backgroundColor: 'white',
        paddingBottom: 26,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
        textAlign: 'center',
    },
    email: {
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center',
    },
    photo: {
        alignItems: 'center',
        marginTop: 26,
        marginBottom: 16,
    },
    borderPhoto: {
        borderWidth: 1,
        borderColor: '#8D92A3',
        width: 110,
        height: 110,
        borderRadius: 110,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoContainer: {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#F0F0F0',
        padding: 24,
    },
    containerAccount: {
        paddingHorizontal: 24,
        backgroundColor: 'white',
        paddingVertical: 12,
    },
});

import axios from 'axios';
import {API_HOST} from '../../config';
import {ItemListMenu} from '../../components';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-picker';
import {getData, showMessage, storeData} from '../../utils';
import asyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function Profile({navigation}) {
    const [userProfile, setUserProfile] = useState({});

    const updateUserProfile = () => {
        getData('userProfile').then(res => {
            console.log(res);
            setUserProfile(res);
        });
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            updateUserProfile();
        });
    }, [navigation]);

    const updatePhoto = () => {
        ImagePicker.launchImageLibrary(
            {
                quality: 0.7,
                maxWidth: 200,
                maxHeight: 200,
            },
            response => {
                if (response.didCancel || response.error) {
                    showMessage('Anda tidak memilih photo');
                } else {
                    const dataImage = {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName,
                    };

                    const photoForUpload = new FormData();
                    photoForUpload.append('file', dataImage);
                    getData('token').then(resToken => {
                        axios
                            .post(
                                `${API_HOST.url}/user/photo`,
                                photoForUpload,
                                {
                                    headers: {
                                        Authorization: resToken.value,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                },
                            )
                            .then(res => {
                                getData('userProfile').then(resUser => {
                                    showMessage(
                                        'Update Photo Berhasil',
                                        'success',
                                    );
                                    resUser.profile_photo_url = `${API_HOST.storage}/${res.data.data[0]}`;
                                    storeData('userProfile', resUser).then(
                                        () => {
                                            updateUserProfile();
                                        },
                                    );
                                });
                            })
                            .catch(err => {
                                showMessage(
                                    `${err?.response?.data?.message} on Update Photo API` ||
                                        'Terjadi kesalahan di API Update Photo',
                                );
                            });
                    });
                }
            },
        );
    };

    const signOut = () => {
        asyncStorage.multiRemove(['userProfile', 'token']).then(() => {
            navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
        });
    };

    return (
        <View style={styles.page}>
            <View style={styles.profileDetail}>
                <View style={styles.photo}>
                    <TouchableOpacity onPress={updatePhoto}>
                        <View style={styles.borderPhoto}>
                            <Image
                                source={{uri: userProfile.profile_photo_url}}
                                style={styles.photoContainer}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{userProfile.name}</Text>
                <Text style={styles.email}>{userProfile.email}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.containerAccount}>
                    <ItemListMenu
                        text="Edit Profile"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <ItemListMenu text="Home Address" />
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

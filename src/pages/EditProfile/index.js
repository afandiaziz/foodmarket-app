import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {API_HOST} from '../../config';
import {launchImageLibrary} from 'react-native-image-picker';
import {getData, showMessage, storeData, useForm} from '../../utils';
import {Gap, Button, Header, Select, TextInput} from '../../components';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

const EditProfile = ({navigation, route}) => {
    const [userProfile, setUserProfile] = useState({});

    const [form, setForm] = useForm({
        name: route.params.name,
    });

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

    const onSubmit = () => {
        let resultObj = {};
        Object.keys(form).map(obj => {
            if (form[obj]) {
                resultObj[obj] = form[obj];
            }
        });
        getData('token').then(resToken => {
            axios
                .post(`${API_HOST.url}/user`, resultObj, {
                    headers: {
                        Authorization: resToken.value,
                    },
                })
                .then(res => {
                    showMessage('Update Success', 'success');
                    storeData('userProfile', res.data.data).then(() => {
                        navigation.goBack();
                    });
                })
                .catch(err => {
                    if (err.response.data.data.error) {
                        let errMessages = '';
                        for (let key in err.response.data.data.error) {
                            err.response.data.data.error[key].map(msg => {
                                errMessages +=
                                    errMessages == ''
                                        ? '- ' + msg
                                        : '\n- ' + msg;
                            });
                        }
                        showMessage(errMessages);
                    } else {
                        showMessage(
                            `${err?.response?.data?.message} on Update Profile API` ||
                                'Terjadi kesalahan di API Update Profile',
                        );
                    }
                });
        });
    };

    const updatePhoto = () => {
        launchImageLibrary(
            {
                quality: 0.5,
                maxWidth: 200,
                maxHeight: 200,
            },
            response => {
                if (response.didCancel || response.error) {
                    showMessage('Anda tidak memilih photo');
                } else {
                    const dataImage = {
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName,
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
                                    `${err?.response?.data?.message} on Update Photo` ||
                                        'Terjadi kesalahan di API Update Photo',
                                );
                            });
                    });
                }
            },
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.page}>
                <Header
                    title="Edit Profile"
                    subTitle="Update your profile"
                    onBack={() => navigation.goBack()}
                />
                <View style={styles.container}>
                    <View style={styles.photo}>
                        <TouchableOpacity onPress={updatePhoto}>
                            <View style={styles.borderPhoto}>
                                <Image
                                    source={{
                                        uri: userProfile.profile_photo_url,
                                    }}
                                    style={styles.photoContainer}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        label="Full Name"
                        placeholder="Type your full name"
                        value={form.name}
                        onChangeText={value => setForm('name', value)}
                    />
                    <Gap height={16} />
                    <TextInput
                        label="Email Address"
                        placeholder="Type your email address"
                        value={userProfile.email}
                        editable={false}
                        onChangeText={value => setForm('email', value)}
                    />
                    <Gap height={24} />
                    <Button text="Update" onPress={onSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
    },
    page: {
        flex: 1,
    },
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 26,
        marginTop: 24,
        flex: 1,
    },
    photo: {
        alignItems: 'center',
    },
    borderPhoto: {
        borderWidth: 1,
        borderColor: '#8D92A3',
        width: 150,
        height: 150,
        borderRadius: 150,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoContainer: {
        width: 130,
        height: 130,
        borderRadius: 130,
        backgroundColor: '#F0F0F0',
        padding: 24,
    },
});

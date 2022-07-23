import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData, useForm} from '../../utils';
import {Gap, Button, Header, Select, TextInput} from '../../components';
import {
    PermissionsAndroid,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const EditAddress = ({navigation, route}) => {
    const [cities, setCities] = useState(null);
    const [address, setAddress] = useState(route.params.address);
    const [provincies, setProvincies] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [cityId, setCityId] = useState(String(route.params.city));
    const [provinceId, setProvinceId] = useState(String(route.params.province));

    const [form, setForm] = useForm({
        city: route.params.city,
        name: route.params.name,
        address: route.params.address,
        province: route.params.province,
        houseNumber: route.params.houseNumber,
        phoneNumber: route.params.phoneNumber,
    });

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

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            ({coords}) => {
                axios
                    .get(API_HOST.gmapsUrl, {
                        params: {
                            key: API_HOST.gmapsKey,
                            latlng: `${coords.latitude},${coords.longitude}`,
                        },
                    })
                    .then(({data}) => {
                        setAddress(data.results[0].formatted_address);
                        setForm('address', data.results[0].formatted_address);
                    });
            },
            error => {
                showMessage(error);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    };

    const currentLocationHandler = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This app needs to access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getOneTimeLocation();
                } else {
                    showMessage('Permission Denied');
                }
            } catch (error) {
                showMessage(error);
            }
        }
    };

    useEffect(() => {
        if (loadingData) {
            axios
                .get('https://api.rajaongkir.com/starter/province', {
                    headers: {
                        key: API_HOST.rajaongkirKey,
                    },
                })
                .then(({data}) => {
                    if (data.rajaongkir.status.code == 200) {
                        setProvincies(data.rajaongkir.results);
                        setLoadingData(false);
                    }
                });
        }
    }, [loadingData]);

    useEffect(() => {
        axios
            .get('https://api.rajaongkir.com/starter/city', {
                headers: {
                    key: API_HOST.rajaongkirKey,
                },
                params: {
                    province: provinceId,
                },
            })
            .then(({data}) => {
                if (data.rajaongkir.status.code == 200) {
                    setCities(data.rajaongkir.results);
                    setForm('city', data.rajaongkir.results[0].city_id);
                }
            });
    }, [provinceId]);

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.page}>
                <Header
                    title="Edit Address"
                    subTitle="Update your address"
                    onBack={() => navigation.goBack()}
                />
                <View style={styles.container}>
                    <TextInput
                        label="Address"
                        placeholder="Type your address"
                        value={address}
                        onChangeText={value => {
                            setAddress(value);
                            setForm('address', value);
                        }}
                    />
                    <Gap height={16} />
                    <Button
                        text="Get My Location"
                        backgroundColor="#8D92A3"
                        onPress={currentLocationHandler}
                    />
                    <Gap height={16} />
                    <TextInput
                        label="House Number"
                        placeholder="Type your house number"
                        value={form.houseNumber}
                        onChangeText={value => setForm('houseNumber', value)}
                    />
                    <Gap height={16} />
                    <TextInput
                        label="Phone Number"
                        placeholder="Type your phone number"
                        value={form.phoneNumber}
                        onChangeText={value => setForm('phoneNumber', value)}
                    />
                    <Gap height={16} />
                    <Select
                        label="Province"
                        placeholder="Select your province"
                        items={provincies}
                        value={provinceId}
                        type="province"
                        onSelectChange={value => {
                            setProvinceId(value);
                            setForm('province', value);
                        }}
                    />
                    <Gap height={16} />
                    <Select
                        ect
                        label="City"
                        placeholder="Select your city"
                        items={cities}
                        value={cityId}
                        type="city"
                        onSelectChange={value => {
                            setCityId(value);
                            setForm('city', cityId);
                        }}
                    />
                    <Gap height={24} />
                    <Button text="Update" onPress={onSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

export default EditAddress;

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
});

import axios from 'axios';
import {API_HOST} from '../../config';
import React, {useEffect, useState} from 'react';
import {useForm, showMessage} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {setLoading, signUpAction} from '../../redux/action';
import {Button, Gap, Header, TextInput, Select} from '../../components';
import {
    PermissionsAndroid,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

export default function SignUpAddress({navigation}) {
    const dispatch = useDispatch();
    const [cityId, setCityId] = useState('');
    const [cities, setCities] = useState(null);
    const [address, setAddress] = useState('');
    const [provinceId, setProvinceId] = useState('1');
    const [provincies, setProvincies] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const {registerReducer, photoReducer} = useSelector(state => state);

    const [form, setForm] = useForm({
        phoneNumber: '',
        address: '',
        houseNumber: '',
        city: '',
        province: '',
    });

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
                    console.log(data.rajaongkir.results);
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

    const onSubmit = () => {
        const data = {
            ...form,
            ...registerReducer,
        };
        dispatch(setLoading(true));
        dispatch(signUpAction(data, photoReducer, navigation));
    };

    return (
        <>
            {!loadingData && provincies ? (
                <ScrollView style={styles.scroll}>
                    <View style={styles.page}>
                        <Header
                            title="Address"
                            subTitle="Make sure it’s valid"
                            onBack={() => {
                                navigation.goBack();
                            }}
                        />
                        <View style={styles.container}>
                            <TextInput
                                label="Phone No."
                                placeholder="Type your phone number"
                                value={form.phoneNumber}
                                onChangeText={value =>
                                    setForm('phoneNumber', value)
                                }
                            />
                            <Gap height={16} />
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
                                label="House No."
                                placeholder="Type your house number"
                                value={form.houseNumber}
                                onChangeText={value =>
                                    setForm('houseNumber', value)
                                }
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
                            <Button text="Sign Up Now" onPress={onSubmit} />
                            <Gap height={24} />
                        </View>
                    </View>
                </ScrollView>
            ) : (
                ''
            )}
        </>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
    },
    page: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingVertical: 26,
        marginTop: 24,
        flex: 1,
    },
});

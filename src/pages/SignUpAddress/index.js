import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput, Select} from '../../components';
import {setLoading, signUpAction} from '../../redux/action';

export default function SignUpAddress({navigation}) {
    const dispatch = useDispatch();
    const [provincies, setProvincies] = useState(null);
    const [provinceId, setProvinceId] = useState('1');
    const [cities, setCities] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const {registerReducer, photoReducer} = useSelector(state => state);

    const [form, setForm] = useForm({
        phoneNumber: '',
        address: '',
        houseNumber: '',
        city: '',
        province: '',
    });

    useEffect(() => {
        if (loadingData) {
            axios
                .get('https://api.rajaongkir.com/starter/province', {
                    headers: {
                        key: 'd3ea6f226ea66889f5f71faf5d962d1b',
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
        setForm('province', provinceId);
        axios
            .get('https://api.rajaongkir.com/starter/city', {
                headers: {
                    key: 'd3ea6f226ea66889f5f71faf5d962d1b',
                },
                params: {
                    province: provinceId,
                },
            })
            .then(({data}) => {
                if (data.rajaongkir.status.code == 200) {
                    setCities(data.rajaongkir.results);
                    setForm(
                        'city',
                        `${data.rajaongkir.results[0].type} ${data.rajaongkir.results[0].city_name}`,
                    );
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
                                value={form.address}
                                onChangeText={value =>
                                    setForm('address', value)
                                }
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
                                onSelectChange={value => setProvinceId(value)}
                            />
                            <Gap height={16} />
                            <Select
                                label="City"
                                placeholder="Select your city"
                                items={cities}
                                value={form.city}
                                type="city"
                                onSelectChange={value => setForm('city', value)}
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

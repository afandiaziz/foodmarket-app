import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput, Select} from '../../components';

export default function SignUpAddress({navigation}) {
    const dispatch = useDispatch();
    const [provincies, setProvincies] = useState(null);
    const [provinceId, setProvinceId] = useState(1);
    const [cities, setCities] = useState(null);
    const [loading, setLoading] = useState(true);
    const registerReducer = useSelector(state => state.registerReducer);

    const [form, setForm] = useForm({
        phoneNumber: '',
        address: '',
        houseNumber: '',
        city: '',
    });

    useEffect(() => {
        if (loading) {
            axios
                .get('https://pro.rajaongkir.com/api/province', {
                    headers: {
                        key: '50888c314eceb4b7487e2f528fd4fa10',
                    },
                })
                .then(({data}) => {
                    if (data.rajaongkir.status.code == 200) {
                        setProvincies(data.rajaongkir.results);
                        setLoading(false);
                    }
                });
        }
    }, [loading]);

    useEffect(() => {
        axios
            .get('https://pro.rajaongkir.com/api/city', {
                headers: {
                    key: '50888c314eceb4b7487e2f528fd4fa10',
                },
                params: {
                    province: provinceId,
                },
            })
            .then(({data}) => {
                if (data.rajaongkir.status.code == 200) {
                    setCities(data.rajaongkir.results);
                }
            });
    }, [provinceId]);

    const onSubmit = () => {
        const data = {
            ...form,
            ...registerReducer,
        };
    };

    return (
        <>
            {!loading && provincies ? (
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
                                enabled={true}
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
                                enabled={cities ? true : false}
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

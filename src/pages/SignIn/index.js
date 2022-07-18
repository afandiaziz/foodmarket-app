import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {useForm} from '../../utils';

export default function SignIn({navigation}) {
    const [form, setForm] = useForm({
        email: '',
        password: '',
    });
    return (
        <View style={styles.page}>
            <Header title="Sign In" subTitle="Find your best ever meal" />
            <View style={styles.container}>
                <TextInput
                    label="Email Address"
                    placeholder="Type your email address"
                    // value="afandiaziz46@gmail.com"
                    onChangeText={value => setForm('email', value)}
                />
                <Gap height={16} />
                <TextInput
                    label="Password"
                    placeholder="Type your password"
                    // value="12345678"
                    onChangeText={value => setForm('password', value)}
                    secureTextEntry
                />
                <Gap height={24} />
                <Button
                    text="Sign In"
                    onPress={() => {
                        navigation.replace('MainApp');
                    }}
                />
                <Gap height={12} />
                <Button
                    text="Create New Account"
                    backgroundColor="#8D92A3"
                    textColor="#fff"
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, TextInput} from '../../components';
import {signInAction} from '../../redux/action';
import {useForm} from '../../utils';

export default function SignIn({navigation}) {
    const dispatch = useDispatch();
    const [form, setForm] = useForm({
        email: '',
        password: '',
    });

    const onSubmit = () => {
        dispatch(signInAction(form, navigation));
    };

    return (
        <View style={styles.page}>
            <Header title="Sign In" subTitle="Find your best ever meal" />
            <View style={styles.container}>
                <TextInput
                    label="Email Address"
                    placeholder="Type your email address"
                    onChangeText={value => setForm('email', value)}
                />
                <Gap height={16} />
                <TextInput
                    label="Password"
                    placeholder="Type your password"
                    onChangeText={value => setForm('password', value)}
                    secureTextEntry
                />
                <Gap height={24} />
                <Button text="Sign In" onPress={onSubmit} />
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

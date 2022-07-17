import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';

export default function SignIn({navigation}) {
    return (
        <View style={styles.page}>
            <Header title="Sign In" subTitle="Find your best ever meal" />
            <View style={styles.container}>
                <TextInput
                    label="Email Address"
                    placeholder="Type your email address"
                />
                <Gap height={16} />
                <TextInput label="Password" placeholder="Type your password" />
                <Gap height={24} />
                <Button text="Sign In" />
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

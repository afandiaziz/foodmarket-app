import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput, Select} from '../../components';

export default function SignUpAddress({navigation}) {
    return (
        <View style={styles.page}>
            <Header
                title="Address"
                subTitle="Make sure it’s valid"
                onBack={() => {
                    navigation.navigate('SignUp');
                }}
            />
            <View style={styles.container}>
                <TextInput
                    label="Phone No."
                    placeholder="Type your phone number"
                />
                <Gap height={16} />
                <TextInput label="Address" placeholder="Type your address" />
                <Gap height={16} />
                <TextInput
                    label="House No."
                    placeholder="Type your house number"
                />
                <Gap height={16} />
                <Select label="City" placeholder="Select your city" />
                <Gap height={24} />
                <Button text="Sign Up Now" />
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

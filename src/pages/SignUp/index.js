import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {useForm} from '../../utils';

export default function SignUp({navigation}) {
    const [form, setForm] = useForm({
        name: '',
        email: '',
        password: '',
    });
    const [photo, setPhoto] = useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch({type: 'SET_REGISTER', value: form});
        navigation.navigate('SignUpAddress');
    };

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.page}>
                <Header
                    title="Sign Up"
                    subTitle="Register and Eat"
                    onBack={() => {
                        navigation.goBack();
                    }}
                />
                <View style={styles.container}>
                    <View style={styles.photo}>
                        <TouchableOpacity>
                            <View style={styles.borderPhoto}>
                                {photo ? (
                                    <Image
                                        source={photo}
                                        style={styles.photoContainer}
                                    />
                                ) : (
                                    <View style={styles.photoContainer}>
                                        <Text style={styles.addPhoto}>
                                            Add Photo
                                        </Text>
                                    </View>
                                )}
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
                        value={form.email}
                        onChangeText={value => setForm('email', value)}
                    />
                    <Gap height={16} />
                    <TextInput
                        label="Password"
                        placeholder="Type your password"
                        value={form.password}
                        onChangeText={value => setForm('password', value)}
                        secureTextEntry
                    />
                    <Gap height={24} />
                    <Button text="Continue" onPress={onSubmit} />
                </View>
            </View>
        </ScrollView>
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
        padding: 24,
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#f0f0f0',
    },
    addPhoto: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center',
    },
});

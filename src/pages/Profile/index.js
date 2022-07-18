import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ItemListMenu} from '../../components';
import {ProfileDummy} from '../../assets';

export default function Profile() {
    return (
        <View style={styles.page}>
            <View style={styles.profileDetail}>
                <View style={styles.photo}>
                    <TouchableOpacity>
                        <View style={styles.borderPhoto}>
                            <Image
                                source={ProfileDummy}
                                style={styles.photoContainer}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>Afandi Aziz</Text>
                <Text style={styles.email}>afandiaziz46@gmail.com</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.containerAccount}>
                    <ItemListMenu
                        text="Edit Profile"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <ItemListMenu text="Home Address" />
                    <ItemListMenu text="Security" />
                    <ItemListMenu text="Payments" />
                    <ItemListMenu text="Sign Out" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 24,
    },
    profileDetail: {
        backgroundColor: 'white',
        paddingBottom: 26,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
        textAlign: 'center',
    },
    email: {
        fontSize: 13,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center',
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
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#F0F0F0',
        padding: 24,
    },
    containerAccount: {
        paddingHorizontal: 24,
        backgroundColor: 'white',
        paddingVertical: 12,
    },
});

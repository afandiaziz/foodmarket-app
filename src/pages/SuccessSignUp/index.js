import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IllustrationSuccessSignUp} from '../../assets';
import {Button, Gap} from '../../components';

const SuccessSignUp = ({navigation}) => {
    return (
        <View style={styles.page}>
            <IllustrationSuccessSignUp />
            <Gap height={30} />
            <Text style={styles.title}>Yeay! Completed</Text>
            <Gap height={6} />
            <Text style={styles.subTitle}>Now you are able to order</Text>
            <Text style={styles.subTitle}>Some foods as a self-reward</Text>
            <Gap height={30} />
            <View style={styles.buttonContainer}>
                <Button
                    text="Find Foods"
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'MainApp'}],
                        });
                    }}
                />
            </View>
        </View>
    );
};

export default SuccessSignUp;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Regular',
        color: '#020202',
    },
    subTitle: {
        fontSize: 14,
        color: '#8d92a3',
        fontFamily: 'Poppins-Light',
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 80,
    },
});

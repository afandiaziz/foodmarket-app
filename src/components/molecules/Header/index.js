import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IcBack} from '../../../assets';

const Header = ({title, subTitle, onBack}) => {
    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity onPress={onBack}>
                    <View style={styles.iconBack}>
                        <IcBack />
                    </View>
                </TouchableOpacity>
            )}
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 30,
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBack: {
        padding: 16,
        marginRight: 16,
        marginLeft: -10,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
    },
    subTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
    },
});

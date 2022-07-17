import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Button = ({text, backgroundColor = '#ffc700', textColor = '#020202'}) => {
    return (
        <View style={styles.container(backgroundColor)}>
            <Text style={styles.text(textColor)}>{text}</Text>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: backgroundColor => ({
        backgroundColor: backgroundColor,
        padding: 12,
        borderRadius: 8,
    }),
    text: textColor => ({
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        color: textColor,
    }),
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({
    text,
    backgroundColor = '#ffc700',
    textColor = '#020202',
    onPress,
}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.container(backgroundColor)}>
                <Text style={styles.text(textColor)}>{text}</Text>
            </View>
        </TouchableOpacity>
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

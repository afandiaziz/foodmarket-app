import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import React from 'react';

const TextInput = ({label, placeholder}) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInputRN style={styles.input} placeholder={placeholder} />
        </View>
    );
};

export default TextInput;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#020202',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#020202',
        borderRadius: 8,
        padding: 10,
    },
});

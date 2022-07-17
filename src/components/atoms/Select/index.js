import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Select = ({label, placeholder}) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input}>
                <Picker
                    placeholder={placeholder}
                    // selectedValue={selectedLanguage}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     setSelectedLanguage(itemValue)
                    // }
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View>
    );
};

export default Select;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-regular',
        color: '#020202',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#020202',
        borderRadius: 8,
        paddingHorizontal: 2,
        paddingVertical: 0,
    },
});

import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Select = ({label, placeholder, items, onSelectChange, value, type}) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input}>
                <Picker
                    placeholder={placeholder}
                    selectedValue={value}
                    onValueChange={itemValue => onSelectChange(itemValue)}>
                    {items &&
                        items.map((item, index) => (
                            <Picker.Item
                                label={
                                    type == 'province'
                                        ? item.province
                                        : `${item.type} ${item.city_name}`
                                }
                                value={
                                    type == 'province'
                                        ? item.province_id
                                        : `${item.type} ${item.city_name}`
                                }
                                key={index}
                            />
                        ))}
                </Picker>
            </View>
        </View>
    );
};

export default Select;

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
        paddingHorizontal: 2,
        paddingVertical: 0,
    },
});

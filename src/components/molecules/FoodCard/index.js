import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FoodCard({image, name, onPress}) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 14,
        overflow: 'hidden',
        marginRight: 24,
    },
    image: {width: 200, height: 140, resizeMode: 'cover'},
    content: {padding: 12},
    text: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
});

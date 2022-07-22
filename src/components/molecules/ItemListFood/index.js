import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Rating from '../Rating';

export default function ItemListFood({image, onPress, rating, price, name}) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.price}>IDR {price}</Text>
                </View>
                <Rating rating={rating} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 8,
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#020202',
    },
    price: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#8d92a3',
    },
});

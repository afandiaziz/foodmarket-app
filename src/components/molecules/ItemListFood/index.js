import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../../assets';
import Rating from '../Rating';

export default function ItemListFood() {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                paddingHorizontal: 24,
                paddingVertical: 8,
                alignItems: 'center',
            }}>
            <Image
                source={FoodDummy1}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginRight: 12,
                }}
            />
            <View
                style={{
                    flex: 1,
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: 'Poppins-Regular',
                        color: '#020202',
                    }}>
                    Soup Bumil
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        fontFamily: 'Poppins-Regular',
                        color: '#8d92a3',
                    }}>
                    IDR 289.000
                </Text>
            </View>
            <Rating rating={4.1} />
        </View>
    );
}

const styles = StyleSheet.create({});

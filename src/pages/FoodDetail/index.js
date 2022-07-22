import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import {IcBackWhite} from '../../assets';
import {Button, Rating} from '../../components';

export default function FoodDetail({navigation, route}) {
    return (
        <View style={styles.page}>
            <ImageBackground
                source={{uri: route.params.picturePath}}
                style={styles.cover}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonBack}
                    onPress={() => navigation.replace('MainApp')}>
                    <IcBackWhite />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    <ScrollView>
                        <View style={styles.productContainer}>
                            <Text style={styles.title}>
                                {route.params.name}
                            </Text>
                            <Rating rating={route.params.rate} />
                        </View>
                        <Text style={styles.description}>
                            {route.params.description}
                        </Text>
                        <Text style={styles.ingredientsTitle}>Ingredients</Text>
                        <Text style={styles.description}>
                            {route.params.ingredients}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceTitle}>Total Price</Text>
                        <Text style={styles.totalPrice}>
                            IDR. {route.params.price}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Button text="Order Now" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    cover: {
        height: 330,
        paddingTop: 26,
        paddingLeft: 22,
    },
    buttonBack: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        marginTop: -40,
        paddingTop: 26,
        paddingHorizontal: 22,
        flex: 1,
    },
    mainContent: {
        flex: 1,
    },
    productContainer: {
        marginBottom: 14,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: '#020202',
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#8d92a3',
        marginBottom: 16,
    },
    ingredientsTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 4,
        color: '#020202',
    },
    footerContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center',
    },
    priceContainer: {
        flex: 1,
    },
    priceTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#8d92a3',
    },
    totalPrice: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: '#020202',
    },
    button: {
        width: 163,
    },
});

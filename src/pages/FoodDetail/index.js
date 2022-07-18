import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import {FoodDummy6, IcBackWhite} from '../../assets';
import {Button, Rating} from '../../components';

export default function FoodDetail({name, navigation}) {
    return (
        <View style={styles.page}>
            <ImageBackground source={FoodDummy6} style={styles.cover}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonBack}
                    onPress={() => navigation.replace('MainApp')}>
                    <IcBackWhite />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.mainContent}>
                    <View style={styles.productContainer}>
                        <Text style={styles.title}>Food 1</Text>
                        <Rating rating={4} />
                    </View>
                    <Text style={styles.description}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Quia natus nobis illum consequatur velit repellat,
                        explicabo modi dicta, saepe eligendi cumque quasi quo
                        expedita corporis hic, blanditiis delectus numquam
                        laudantium?
                    </Text>
                    <Text style={styles.ingredientsTitle}>Ingredients</Text>
                    <Text style={styles.description}>Bawang, Garam</Text>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceTitle}>Total Price</Text>
                        <Text style={styles.totalPrice}>IDR. 290.000</Text>
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

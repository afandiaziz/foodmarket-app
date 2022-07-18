import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IcStarOff, IcStarOn} from '../../../assets';

export default function Rating({rating}) {
    const renderStar = () => {
        let star = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            star.push(<IcStarOn key={i} />);
        }
        for (let i = star.length; i < 5; i++) {
            star.push(<IcStarOff key={i} />);
        }

        return star;
    };
    return (
        <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>{renderStar()}</View>
            <Text style={styles.text}>{rating}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    ratingContainer: {flexDirection: 'row'},
    starContainer: {flexDirection: 'row'},
    text: {fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 4},
});

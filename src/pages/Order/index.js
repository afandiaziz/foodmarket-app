import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components';

export default function Order() {
    return (
        <View style={styles.page}>
            <Header title="Your Orders" subTitle="Wait for the best meal" />
        </View>
    );
}

const styles = StyleSheet.create({});

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4} from '../../assets';
import {FoodCard, Gap, HomeProfile, HomeTabSection} from '../../components';

export default function Home() {
    return (
        <View style={styles.page}>
            <HomeProfile />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.foodCardContainer}>
                        <Gap width={24} />
                        <FoodCard
                            image={FoodDummy1}
                            name="Food Dummy 1"
                            rating={4.2}
                        />
                        <FoodCard
                            image={FoodDummy2}
                            name="Food Dummy 2"
                            rating={3.8}
                        />
                        <FoodCard
                            image={FoodDummy3}
                            name="Food Dummy 3"
                            rating={4.3}
                        />
                        <FoodCard
                            image={FoodDummy4}
                            name="Food Dummy 4"
                            rating={3.5}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.tabContainer}>
                <HomeTabSection />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#FAFAFC',
    },
    foodCardContainer: {
        flexDirection: 'row',
        marginVertical: 24,
    },
    tabContainer: {
        flex: 1,
    },
});

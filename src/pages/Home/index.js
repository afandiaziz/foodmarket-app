import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FoodCard, Gap, HomeProfile, HomeTabSection} from '../../components';
import {getFoodData} from '../../redux/action';

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const {foods} = useSelector(state => state.homeReducer);

    useEffect(() => {
        dispatch(getFoodData());
    }, []);

    return (
        <View style={styles.page}>
            <HomeProfile />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.foodCardContainer}>
                        <Gap width={24} />
                        {foods.map(food => {
                            return (
                                <FoodCard
                                    key={food.id}
                                    name={food.name}
                                    image={{uri: food.picturePath}}
                                    rating={food.rate}
                                    onPress={() =>
                                        navigation.navigate('FoodDetail', food)
                                    }
                                />
                            );
                        })}
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

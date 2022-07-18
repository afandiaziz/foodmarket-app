import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {
    ProfileDummy,
    FoodDummy1,
    FoodDummy2,
    FoodDummy3,
    FoodDummy4,
} from '../../assets';
import {FoodCard, Gap} from '../../components';
import {TabView, SceneMap} from 'react-native-tab-view';

const NewTasteRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}} />
);

const PopularRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const RecommendedRoute = () => (
    <View style={{flex: 1, backgroundColor: '#67aabf'}} />
);

const renderScene = SceneMap({
    1: NewTasteRoute,
    2: PopularRoute,
    3: RecommendedRoute,
});
export default function Home() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: '1', title: 'New Taste'},
        {key: '2', title: 'Popular'},
        {key: '3', title: 'Recommended'},
    ]);

    return (
        <View style={styles.page}>
            <View style={styles.profileContainer}>
                <View>
                    <Text style={styles.appName}>FoodMarket</Text>
                    <Text style={styles.desc}>Let’s get some foods</Text>
                </View>
                <Image source={ProfileDummy} style={styles.profile} />
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.foodCardContainer}>
                        <Gap width={24} />
                        <FoodCard image={FoodDummy1} name="Food Dummy 1" />
                        <FoodCard image={FoodDummy2} name="Food Dummy 2" />
                        <FoodCard image={FoodDummy3} name="Food Dummy 3" />
                        <FoodCard image={FoodDummy4} name="Food Dummy 4" />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.tabContainer}>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
    },
    appName: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
    },
    desc: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    foodCardContainer: {
        flexDirection: 'row',
        marginVertical: 24,
    },
    tabContainer: {
        flex: 1,
    },
});

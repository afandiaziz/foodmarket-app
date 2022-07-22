import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    ScrollView,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ItemListFood from '../ItemListFood';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getFoodDataByTypes} from '../../../redux/action';

const renderTabBar = props => (
    <TabBar
        {...props}
        scrollEnabled
        style={{
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1,
        }}
        tabStyle={{width: 'auto'}}
        renderLabel={({route, focused}) => (
            <Text
                style={{
                    fontFamily: 'Poppins-Medium',
                    color: focused ? '#020202' : '#8d92a3',
                }}>
                {route.title}
            </Text>
        )}
        indicatorStyle={{
            backgroundColor: '#020202',
            height: 3,
            width: 0.5,
            borderRadius: 10,
        }}
    />
);

const NewTasteRoute = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {newTaste} = useSelector(state => state.homeReducer);

    useEffect(() => {
        dispatch(getFoodDataByTypes('new_food'));
    }, []);
    return (
        <ScrollView>
            <View
                style={{
                    paddingTop: 8,
                    flex: 1,
                }}>
                {newTaste.map(item => {
                    return (
                        <ItemListFood
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            image={{uri: item.picturePath}}
                            onPress={() =>
                                navigation.navigate('FoodDetail', item)
                            }
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};

const PopularRoute = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {popular} = useSelector(state => state.homeReducer);

    useEffect(() => {
        dispatch(getFoodDataByTypes('popular'));
    }, []);

    return (
        <ScrollView>
            <View
                style={{
                    paddingTop: 8,
                    flex: 1,
                }}>
                {popular.map(item => {
                    return (
                        <ItemListFood
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            image={{uri: item.picturePath}}
                            onPress={() =>
                                navigation.navigate('FoodDetail', item)
                            }
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};

const RecommendedRoute = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {recommended} = useSelector(state => state.homeReducer);

    useEffect(() => {
        dispatch(getFoodDataByTypes('recommended'));
    }, []);
    return (
        <ScrollView>
            <View
                style={{
                    paddingTop: 8,
                    flex: 1,
                }}>
                {recommended.map(item => {
                    return (
                        <ItemListFood
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            rating={item.rate}
                            image={{uri: item.picturePath}}
                            onPress={() =>
                                navigation.navigate('FoodDetail', item)
                            }
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
};

const renderScene = SceneMap({
    1: NewTasteRoute,
    2: PopularRoute,
    3: RecommendedRoute,
});

export default function HomeTabSection() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 1, title: 'New Taste'},
        {key: 2, title: 'Popular'},
        {key: 3, title: 'Recommended'},
    ]);

    return (
        <TabView
            sceneContainerStyle={{flex: 1}}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            style={{backgroundColor: 'white'}}
        />
    );
}

const styles = StyleSheet.create({});

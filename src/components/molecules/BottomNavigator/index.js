import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
    IcHomeOn,
    IcOrderOn,
    IcProfileOn,
    IcHomeOff,
    IcOrderOff,
    IcProfileOff,
} from '../../../assets';

const Icon = ({label, focus}) => {
    switch (label) {
        case 'Home':
            return focus ? <IcHomeOn /> : <IcHomeOff />;
            break;
        case 'Order':
            return focus ? <IcOrderOn /> : <IcOrderOff />;
            break;
        case 'Profile':
            return focus ? <IcProfileOn /> : <IcProfileOff />;
            break;
    }
};

export default function BottomNavigator({state, descriptors, navigation}) {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
            }}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({name: route.name, merge: true});
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{flex: 1}}>
                        <View
                            style={{
                                paddingTop: 15,
                                paddingBottom: 13,
                                paddingHorizontal: 50,
                                justifyContent: 'space-between',
                            }}>
                            <Icon label={label} focus={isFocused} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({});

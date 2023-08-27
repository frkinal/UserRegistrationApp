import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';

import {HomeScreen, KVKKScreen, ProfileScreen} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-dynamic-vector-icons';

const Tab = createBottomTabNavigator();

const {width} = Dimensions.get('window');

const tabBar = [
  {
    route: 'profile-screen',
    title: 'Hesabım',
    component: (props: any) => <ProfileScreen {...props} />,
    activeTabMenu: 'account',
    inActiveTabMenu: 'account-outline',
  },
  {
    route: 'kvkk-screen',
    title: 'KVKK',
    component: (props: any) => <KVKKScreen {...props} />,
    activeTabMenu: 'file-document',
    inActiveTabMenu: 'file-document-outline',
  },
];
const tabBarWidth = width;
const tabWidth = tabBarWidth / 2;

const MyTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const [translateX] = useState(new Animated.Value(0));

  const translateTabBar = (index: any) => {
    Animated.spring(translateX, {
      toValue: (index === 0 ? index : index - 0.5) * tabWidth,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTabBar(state.index);
  }, [state.index]);

  return (
    <View style={style.tab_bar_container}>
      <Animated.View
        style={[style.sliding_tab_container, {transform: [{translateX}]}]}>
        <Animated.View
          style={[style.sliding_tab, {transform: [{translateX}]}]}
        />
      </Animated.View>
      {state.routes.map((route: any, index: any) => {
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
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIcon = options.tabBarIcon;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Icon
              type="MaterialCommunityIcons"
              size={25}
              color={isFocused ? 'white' : 'black'}
              name={isFocused ? tabBarIcon.activeIcon : tabBarIcon.inActiveIcon}
            />
            {isFocused && (
              <Text style={{color: 'white', fontSize: 15}}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      {tabBar.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              title: item.title,
              tabBarIcon: {
                activeIcon: item.activeTabMenu,
                inActiveIcon: item.inActiveTabMenu,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  tab_bar_container: {
    width: tabBarWidth,
    position: 'absolute',
    height: 75,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  sliding_tab_container: {
    width: tabWidth,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliding_tab: {
    width: tabWidth - 10,
    height: 50,
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
    borderRadius: 10,
  },
});

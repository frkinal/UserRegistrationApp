import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';
import {colors} from '../utils';
import Icon from 'react-native-dynamic-vector-icons';
import {AppTab} from './';
import {useDispatch} from 'react-redux';
import {changeAuthanticated} from '../redux/slices/user-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export const AppDrawerNavigator = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(changeAuthanticated('0'));
    AsyncStorage.removeItem('user');
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        overlayColor: 'transparent',
        drawerStyle: {
          flex: 1,
          backgroundColor: 'transparent',
          zIndex: 1,
          width: '65%',
        },
        headerShown: false,
        drawerType: 'slide',
      }}
      drawerContent={(props: any) => {
        return <CustomDrawerContent {...props} logout={logout} />;
      }}>
      <Drawer.Screen name="app-tab">
        {() => {
          return (
            <AnimateScreen>
              <AppTab />
            </AnimateScreen>
          );
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
const CustomDrawerContent = ({logout, ...rest}: any) => {
  const {state, navigation} = rest;
  const {routes, index} = state;
  const focusedRoute = routes[index].name;

  return (
    <View style={style.contentContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
        }}
        style={style.close}>
        <Icon type="AntDesign" name="close" color={colors.white} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home-screen');
            navigation.closeDrawer();
          }}
          style={[
            style.drawerItem,
            {
              backgroundColor:
                focusedRoute === 'home-screen'
                  ? 'rgba(0,0,0,.4)'
                  : 'transparent',
            },
          ]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={style.drawerItemText}
            children="Ana Sayfa"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={logout} style={[style.drawerItem]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={style.drawerItemText}
          children="Çıkış Yap"
        />
      </TouchableOpacity>
    </View>
  );
};

const AnimateScreen = ({children, ...rest}: any) => {
  const progress = useDrawerProgress();

  const animatedStyleV = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.7], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 26], 'clamp'),
    overflow: 'hidden',
  }));

  const animatedStyleV2 = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.75], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [1, 0.7], 'clamp'),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 26], 'clamp'),
    overflow: 'hidden',
  }));
  const animatedStyleV3 = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {
        scaleX: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp'),
      },
      {
        scaleY: interpolate(progress.value, [0, 1], [1, 0.6], 'clamp'),
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 26], 'clamp'),
    overflow: 'hidden',
  }));
  return (
    <View {...rest} style={style.contentContainer}>
      <View style={style.animateContainer}>
        <Animated.View style={[animatedStyleV3, style.animateView3]} />
        <Animated.View style={[animatedStyleV2, style.animateView2]} />
        <Animated.View style={[animatedStyleV, style.animateView1]}>
          {children}
        </Animated.View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  close: {
    left: 50,
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeText: {
    color: colors.white,
    fontSize: 20,
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    color: colors.white,
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.drawerBg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.drawerBg,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  animateContainer: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'visible',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  animateView1: {
    flex: 1,
    overflow: 'hidden',
  },
  animateView2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  animateView3: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer_image_item: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});

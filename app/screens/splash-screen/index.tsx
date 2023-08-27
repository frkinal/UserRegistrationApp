import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import style from './style';
import {colors} from '../../utils';
import {changeAuthanticated} from '../../redux/slices/user-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

export const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(session => {
        session !== null
          ? dispatch(changeAuthanticated('1'))
          : dispatch(changeAuthanticated('0'));
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

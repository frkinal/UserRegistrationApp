import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';

import {TextInput, Button} from '../../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {changeAuthanticated} from '../../../redux/slices/user-slice';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email tipinde olmalıdır.')
    .required('Email Adres girmeniz gereklidir.'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const {users} = useSelector((state: any) => state.user);

  return (
    <View style={style.container}>
      <ScrollView style={style.scroll_container}>
        <View style={style.form_container}>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              console.log(values);
              const userData = users.find(
                (user: any) => user.email === values.email,
              );
              if (!userData) {
                Alert.alert('Böyle bir kullanıcı bulunamadı');
              } else {
                if (userData.email === values.email) {
                  if (userData.password === values.password) {
                    AsyncStorage.setItem('user', JSON.stringify(userData));
                    dispatch(changeAuthanticated('1'));
                  } else {
                    Alert.alert('Şifre hatalı');
                  }
                }
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={style.error_text}>{errors.email}</Text>
                )}
                <TextInput
                  name="password"
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  isPassword
                />
                {errors.password && touched.password && (
                  <Text style={style.error_text}>{errors.password}</Text>
                )}
                <View style={style.button_container}>
                  <Button
                    onPress={() => handleSubmit()}
                    text="Giriş Yap"
                    color="white"
                  />
                  <Button
                    onPress={() => {
                      navigation.navigate('register-screen');
                    }}
                    preset="muted"
                    text="Kayıt Ol"
                    color="white"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

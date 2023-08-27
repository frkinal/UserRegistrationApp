import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import {TextInput, Button, Picker} from '../../../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from './style';
import {Checkbox, RadioButton} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import DynamicIcon from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Adres girmeniz gereklidir.'),
  password: yup
    .string()
    .min(6, ({min}) => `Şifreniz en az ${min} karakter olmalıdır.`)
    .required('Şifre girmeniz gereklidir.'),
  fullName: yup
    .string()
    .min(6, () => 'Ad Soyad girmeniz gereklidir.')
    .required('Ad Soyad girmeniz gereklidir.'),
  idNumber: yup
    .number()
    .min(11, ({min}) => `Kimlik numaranız en az ${min} karakter olmalıdır.`)
    .required('Kimlik numaranızı girmeniz gereklidir.'),
  phoneNumber: yup
    .number()
    .min(10, ({min}) => `Telefon numaranız en az ${min} karakter olmalıdır.`)
    .required('Telefon numaranızı girmeniz gereklidir.'),
  check: yup.boolean().oneOf([true], 'KVKK sözleşmesini kabul etmelisiniz.'),
  image: yup
    .string()
    .min(1, () => 'Fotoğraf seçmeniz gereklidir.')
    .required('Fotoğraf seçmeniz gereklidir.'),
  country: yup
    .string()
    .min(1, () => 'Ülke seçmeniz gereklidir.')
    .required('Ülke seçmeniz gereklidir'),
  gender: yup
    .string()
    .min(1, () => 'Cinsiyet seçmeniz gereklidir.')
    .required('Cinsiyet seçmeniz gereklidir'),
});
const includeExtra = true;

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const [cameraModalVisible, setCameraModalVisible] = useState<boolean>(false);
  const [response, setResponse] = useState<any>([]);
  const [images, setImages] = useState<Array<any>>([]);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [countries, setCountries] = useState<Array<any>>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>('-1');
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');

  const devices = useCameraDevices();
  const device = devices.back;

  const actions = [
    {
      title: 'Fotoğraf Çek',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
        quality: 0.4,
      },
    },
    {
      title: 'Galeriden Seç',
      type: 'library',
      options: {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
        quality: 0.4,
      },
    },
  ];

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => {
        res.json().then(data => {
          setCountries(
            data?.map((item: any, index: any) => {
              return {
                id: index,
                title: item.name.common,
              };
            }),
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (response?.assets === undefined) {
      setImages(images);
    } else if (response && !response?.didCancel) {
      const datas = response?.assets?.map((item: any) => {
        return {
          fileCopyUri: null,
          name: item.fileName.slice(25),
          size: item.fileSize,
          type: item.type,
          uri: item.uri,
        };
      });
      setImages(datas);
      setImageModalVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const onButtonPress = useCallback(async (type: any, options: any) => {
    if (type === 'capture') {
      const statuss = await Camera.requestCameraPermission();
      setHasPermission(statuss === 'authorized');
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);
  const deleteImage = (img: any) => {
    let datas = images.filter((item: any, index: any) => {
      if (index !== -1 && img !== index) {
        return item;
      }
    });
    setImages(datas);
  };
  const changeImageModalVisible = () =>
    setImageModalVisible(!imageModalVisible);
  const changeCameraModalVisible = () => {
    setCameraModalVisible(!cameraModalVisible);
  };

  return (
    <View style={style.container}>
      <ScrollView style={style.scroll_container}>
        <View style={style.form_container}>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{
              email: '',
              password: '',
              fullName: '',
              idNumber: '',
              phoneNumber: '',
              gender: '',
              check: false,
              image: '',
              country: '',
            }}
            onSubmit={values => {
              navigation.navigate('carrier-screen', {params: values});
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              setFieldValue,
            }) => (
              <>
                <View style={style.photo_container}>
                  <Image
                    style={style.user_photo}
                    source={
                      images?.length > 0
                        ? {uri: images[0]?.uri}
                        : require('../../../../assets/images/user.png')
                    }
                  />
                  <DynamicIcon
                    type="AntDesign"
                    name={images?.length > 0 ? 'close' : 'plus'}
                    size={25}
                    color="black"
                    style={style.add_photo_icon}
                    onPress={
                      images?.length > 0
                        ? () => deleteImage(0)
                        : changeImageModalVisible
                    }
                  />
                </View>
                <TextInput
                  name="fullName"
                  placeholder="Ad Soyad"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={style.error_text}>{errors.fullName}</Text>
                )}
                <TextInput
                  name="idNumber"
                  placeholder="Kimlik Numarası"
                  onChangeText={handleChange('idNumber')}
                  onBlur={handleBlur('idNumber')}
                  value={values.idNumber}
                  keyboardType="numeric"
                />
                {errors.idNumber && touched.idNumber && (
                  <Text style={style.error_text}>{errors.idNumber}</Text>
                )}
                <TextInput
                  name="phoneNumber"
                  placeholder="Telefon Numarası"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text style={style.error_text}>{errors.phoneNumber}</Text>
                )}
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
                <Picker
                  selectedVal={selectedCountryName}
                  setSelectedVal={(val: string) => {
                    setSelectedCountryName(val);
                    setFieldValue('country', val);
                  }}
                  setSelected={setSelectedCountry}
                  data={countries}
                  text="Ülke Seçiniz"
                  headerText="Ülke Seçiniz"
                  haveSearch
                />
                {errors.country && touched.country && (
                  <Text style={style.error_text}>{errors.country}</Text>
                )}
                <RadioButton.Group
                  onValueChange={handleChange('gender')}
                  value={values.gender}>
                  <View style={style.radio_button_container}>
                    <View style={style.radio_button_item_container}>
                      <RadioButton value="Erkek" />
                      <Text>Erkek</Text>
                    </View>
                    <View style={style.radio_button_item_container}>
                      <RadioButton value="Kadın" />
                      <Text>Kadın</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                {errors.gender && touched.gender && (
                  <Text style={style.error_text}>{errors.gender}</Text>
                )}
                <View style={style.check_box_container}>
                  <Checkbox
                    status={values.check ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setFieldValue('check', !values.check);
                    }}
                  />
                  <Text>
                    KVKK sözleşmesini{' '}
                    <Text
                      onPress={() =>
                        navigation.navigate('kvkk-screen', {
                          fromAuth: true,
                        })
                      }>
                      kabul ediyorum.
                    </Text>
                  </Text>
                </View>
                {errors.check && touched.check && (
                  <Text style={style.error_text}>{errors.check}</Text>
                )}
                <View style={style.bottom_container}>
                  <Button
                    onPress={() => {
                      setFieldValue('image', images[0]?.uri);
                      handleSubmit();
                    }}
                    text="Devam Et"
                    color="white"
                  />
                  <Button
                    onPress={() => {
                      navigation.goBack();
                    }}
                    preset="muted"
                    text="Giriş Yap"
                    color="white"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Modal
        animationType="none"
        transparent={true}
        visible={imageModalVisible}>
        <TouchableWithoutFeedback onPress={changeImageModalVisible}>
          <View style={style.image_modal_container}>
            <TouchableWithoutFeedback>
              <View style={style.inner_image_modal_container}>
                {actions.map(({title, type, options}) => {
                  return (
                    <Button
                      text={title}
                      color="white"
                      onPress={() => onButtonPress(type, options)}
                    />
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        onRequestClose={changeCameraModalVisible}
        animationType="fade"
        transparent={true}
        visible={cameraModalVisible}>
        <View style={style.camera_modal_container}>
          {device != null && hasPermission ? (
            <Camera style={style.camera} device={device} isActive={true} />
          ) : (
            <Text
              type="bold"
              style={style.prepare_camera}
              adjustsFontSizeToFit
              numberOfLines={2}
              translate="camera_loading"
            />
          )}
          <DynamicIcon
            type="AntDesign"
            name="close"
            size={30}
            color="white"
            style={style.close_icon}
            onPress={changeCameraModalVisible}
          />
        </View>
      </Modal>
    </View>
  );
};

import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {TextInput, Button, Picker} from '../../../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
const loginValidationSchema = yup.object().shape({
  employmentStatus: yup
    .string()
    .min(1, () => 'Çalışma şekli seçmeniz gereklidir.')
    .required('Çalışma şekli seçmeniz gereklidir'),
  job: yup
    .string()
    .min(1, () => 'Meslek seçmeniz gereklidir.')
    .required('Meslek seçmeniz gereklidir'),
});

export const CarrierScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {params} = route.params;

  const [selectedEmploymentStatus, setSelectedEmploymentStatus] =
    useState<string>('-1');
  const [selectedEmploymentStatusName, setSelectedEmploymentStatusName] =
    useState<string>('');

  const employmentStatus = [
    {
      id: '0',
      title: 'Öğrenci',
    },
    {
      id: '1',
      title: 'Çalışan',
    },
    {
      id: '2',
      title: 'İşsiz',
    },
  ];

  return (
    <View style={style.container}>
      <ScrollView style={style.scroll_container}>
        <View style={style.form_container}>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{
              job: '',
              employmentStatus: '',
            }}
            onSubmit={values =>
              navigation.navigate('education-screen', {
                params: {
                  ...params,
                  ...values,
                },
              })
            }>
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
                <TextInput
                  name="job"
                  placeholder="Meslek"
                  onChangeText={handleChange('job')}
                  onBlur={handleBlur('job')}
                  value={values.job}
                />
                {errors.job && touched.job && (
                  <Text style={style.error_text}>{errors.job}</Text>
                )}
                <Picker
                  selectedVal={selectedEmploymentStatusName}
                  setSelectedVal={(val: string) => {
                    setFieldValue('employmentStatus', val);
                    setSelectedEmploymentStatusName(val);
                  }}
                  setSelected={setSelectedEmploymentStatus}
                  data={employmentStatus}
                  text="Çalışma Şekli Seçiniz"
                  headerText="Çalışma Şekli Seçiniz"
                  haveSearch
                />
                {errors.employmentStatus && touched.employmentStatus && (
                  <Text style={style.error_text}>
                    {errors.employmentStatus}
                  </Text>
                )}
                <View style={style.bottom_container}>
                  <Button
                    onPress={() => handleSubmit()}
                    text="Devam Et"
                    color="white"
                  />
                  <Button
                    onPress={() => {
                      navigation.goBack();
                    }}
                    preset="muted"
                    text="Geri Dön"
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

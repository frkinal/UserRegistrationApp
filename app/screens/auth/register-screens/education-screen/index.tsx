import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {TextInput, Button, Picker} from '../../../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
const loginValidationSchema = yup.object().shape({
  educationLevel: yup
    .string()
    .min(1, () => 'Eğitim düzeyi seçmeniz gereklidir.')
    .required('Eğitim düzeyi seçmeniz gereklidir'),
  schoolName: yup
    .string()
    .min(1, () => 'Okul adı girmeniz gereklidir.')
    .required('Okul adı girmeniz gereklidir'),
  facultyName: yup
    .string()
    .min(1, () => 'Fakülte adı girmeniz gereklidir.')
    .required('Fakülte adı girmeniz gereklidir'),
  sectionName: yup
    .string()
    .min(1, () => 'Bölüm girmeniz gereklidir.')
    .required('Bölüm girmeniz gereklidir'),
  startDate: yup
    .string()
    .min(1, () => 'Giriş tarihi girmeniz gereklidir.')
    .required('Giriş tarihi girmeniz gereklidir'),
  endDate: yup
    .string()
    .min(1, () => 'Bitiş tarihi girmeniz gereklidir.')
    .required('Bitiş tarihi girmeniz gereklidir'),
  qualifications: yup
    .string()
    .min(1, () => 'En az bir yetkinlik girmeniz gereklidir.')
    .required('En az bir yetkinlik girmeniz gereklidir'),
});

export const EducationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {params} = route.params;

  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<string>('-1');
  const [selectedEducationLevelName, setSelectedEducationLevelName] =
    useState<string>('');

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDateOpen, setStartDateOpen] = useState<boolean>(false);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endDateOpen, setEndDateOpen] = useState<boolean>(false);

  const educationLevel = [
    {
      id: '0',
      title: 'İlkokul',
    },
    {
      id: '1',
      title: 'Lise',
    },
    {
      id: '2',
      title: 'Ön Lisans',
    },
    {
      id: '3',
      title: 'Lisans',
    },
    {
      id: '4',
      title: 'Yüksek Lisans',
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
              educationLevel: '',
              schoolName: '',
              facultyName: '',
              sectionName: '',
              startDate: '',
              endDate: '',
              qualifications: '',
            }}
            onSubmit={values =>
              navigation.navigate('resume-screen', {
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
                <Picker
                  selectedVal={selectedEducationLevelName}
                  setSelectedVal={(val: string) => {
                    setFieldValue('educationLevel', val);
                    setSelectedEducationLevelName(val);
                  }}
                  setSelected={setSelectedEducationLevel}
                  data={educationLevel}
                  text="Eğitim Düzeyi Seçiniz"
                  headerText="Eğitim Düzeyi Seçiniz"
                  haveSearch
                />
                {errors.educationLevel && touched.educationLevel && (
                  <Text style={style.error_text}>{errors.educationLevel}</Text>
                )}
                <TextInput
                  name="schoolName"
                  placeholder="Okul Adı"
                  onChangeText={handleChange('schoolName')}
                  onBlur={handleBlur('schoolName')}
                  value={values.schoolName}
                />
                {errors.schoolName && touched.schoolName && (
                  <Text style={style.error_text}>{errors.schoolName}</Text>
                )}
                <TextInput
                  name="facultyName"
                  placeholder="Fakülte"
                  onChangeText={handleChange('facultyName')}
                  onBlur={handleBlur('facultyName')}
                  value={values.facultyName}
                />
                {errors.facultyName && touched.facultyName && (
                  <Text style={style.error_text}>{errors.facultyName}</Text>
                )}
                <TextInput
                  name="sectionName"
                  placeholder="Bölüm"
                  onChangeText={handleChange('sectionName')}
                  onBlur={handleBlur('sectionName')}
                  value={values.sectionName}
                />
                {errors.sectionName && touched.sectionName && (
                  <Text style={style.error_text}>{errors.sectionName}</Text>
                )}
                <View style={style.bottom_container}>
                  <Button
                    preset="white"
                    onPress={() => setStartDateOpen(true)}
                    text={
                      startDate
                        ? startDate.toLocaleDateString()
                        : 'Bitiş Tarihi'
                    }
                    color="black"
                  />
                  {errors.startDate && touched.startDate && (
                    <Text style={style.error_text}>{errors.startDate}</Text>
                  )}
                  <Button
                    preset="white"
                    onPress={() => setEndDateOpen(true)}
                    text={
                      endDate ? endDate.toLocaleDateString() : 'Bitiş Tarihi'
                    }
                    color="black"
                  />
                  {errors.endDate && touched.endDate && (
                    <Text style={style.error_text}>{errors.endDate}</Text>
                  )}
                </View>
                <TextInput
                  name="qualifications"
                  placeholder="Yetkinlikler"
                  onChangeText={handleChange('qualifications')}
                  onBlur={handleBlur('qualifications')}
                  value={values.qualifications}
                />
                {errors.qualifications && touched.qualifications && (
                  <Text style={style.error_text}>{errors.qualifications}</Text>
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
                <DatePicker
                  modal
                  open={startDateOpen}
                  date={startDate}
                  locale="tr"
                  mode="date"
                  onConfirm={date => {
                    setStartDateOpen(false);
                    setStartDate(date);
                    setFieldValue('startDate', date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setStartDateOpen(false);
                  }}
                />
                <DatePicker
                  modal
                  open={endDateOpen}
                  date={endDate}
                  locale="tr"
                  mode="date"
                  onConfirm={date => {
                    setEndDateOpen(false);
                    setEndDate(date);
                    setFieldValue('endDate', date.toLocaleDateString());
                  }}
                  onCancel={() => {
                    setEndDateOpen(false);
                  }}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

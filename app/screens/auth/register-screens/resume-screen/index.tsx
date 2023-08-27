import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';

import {TextInput, Button} from '../../../../components';
import {Formik} from 'formik';
import * as yup from 'yup';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {addUser} from '../../../../redux/slices/user-slice';
const loginValidationSchema = yup.object().shape({
  cv: yup.string(),
  // .min(1, () => 'CV yüklemeniz gereklidir.')
  // .required('CV yüklemeniz gereklidir'),
  projects: yup
    .array()
    .min(1, () => 'Proje girmeniz gereklidir.')
    .required('Proje girmeniz gereklidir'),
});

export const ResumeScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<any>();

  const {params} = route.params;
  const [textValue, setTextValue] = useState<string>('');
  const [numInputs, setNumInputs] = useState<number>(1);
  const [fileResponse, setFileResponse] = useState<object>({});

  const refInputs = useRef<string[]>([textValue]);

  const inputs: JSX.Element[] = [];
  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View key={i} style={style.text_input_container}>
        <TextInput
          value={refInputs.current[i]}
          multiInput={i > 0}
          onChangeText={value => setInputValue(i, value)}
          deleteInput={() => removeInput(i)}
          placeholder={`Proje ${i + 1}`}
        />
      </View>,
    );
  }
  const setInputValue = (index: number, value: string) => {
    const allInputs = refInputs.current;
    allInputs[index] = value;
    setTextValue(value);
  };

  const addInput = () => {
    refInputs.current.push('');
    setNumInputs(value => value + 1);
  };
  const removeInput = (i: number) => {
    refInputs.current.splice(i, 0)[0];
    setNumInputs(value => value - 1);
  };
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <View style={style.container}>
      <ScrollView style={style.scroll_container}>
        <View style={style.form_container}>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{
              cv: '',
              projects: [],
            }}
            onSubmit={values => {
              dispatch(addUser({...params, ...values}));
              Alert.alert(
                'Kayıt Başarılı',
                'Kayıt işlemi başarıyla tamamlandı. Giriş sayfasına yönlendiriliyorsunuz.',
                [
                  {
                    text: 'Tamam',
                    onPress: () => navigation.pop(4),
                  },
                ],
              );
            }}>
            {({handleSubmit, errors, touched, isValid, setFieldValue}) => (
              <>
                <View style={style.pdf_button_container}>
                  <View style={style.show_pdf_button}>
                    <Button
                      text={fileResponse?.uri ? fileResponse?.uri : 'CV Yükle'}
                      color="black"
                      preset="white"
                    />
                  </View>
                  <View style={style.pdf_button}>
                    <Button
                      text="📑 Ekle"
                      onPress={handleDocumentSelection}
                      color="white"
                    />
                  </View>
                </View>
                {errors.cv && touched.cv && (
                  <Text style={style.error_text}>{errors.cv}</Text>
                )}
                {inputs}
                <View style={style.button_container}>
                  <Button
                    preset="green"
                    text="Yeni Proje Ekle"
                    color="white"
                    onPress={addInput}
                  />
                  <Button
                    onPress={() => {
                      setFieldValue('cv', fileResponse.uri);
                      setFieldValue('projects', refInputs.current);
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

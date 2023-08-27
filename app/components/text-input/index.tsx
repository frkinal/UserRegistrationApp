import React, {useEffect, useState} from 'react';
import {
  TextInput as RNTextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {colors} from '../../utils';
import style from './style';
import {TextInputProps} from './props';
export const TextInput = (props: TextInputProps) => {
  const {
    icon,
    isPassword,
    placeholder,
    multiInput,
    deleteInput,
    iconType = 'MaterialCommunityIcons',
    ...rest
  } = props;
  const [visible, setVisible] = useState(false);
  const [isFocused, setİsFocused] = useState(false);
  const chanceVisible = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setİsFocused(false);
      Keyboard.dismiss();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={[style.container, {borderColor: isFocused && colors.black}]}>
      {icon && (
        <View style={style.leftIcon}>
          <Icon type={iconType} color={colors.gray} name={icon} size={25} />
        </View>
      )}
      <RNTextInput
        style={style.input}
        secureTextEntry={isPassword && !visible}
        onFocus={() => setİsFocused(true)}
        onBlur={() => setİsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        autoCapitalize="none"
        {...rest}
      />
      {isPassword && (
        <TouchableWithoutFeedback onPress={chanceVisible}>
          <View style={style.rightIcon}>
            <Icon
              type="Entypo"
              size={25}
              color={!isFocused ? colors.gray : colors.primary}
              name={!visible ? 'eye' : 'eye-with-line'}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {multiInput && (
        <TouchableWithoutFeedback onPress={deleteInput}>
          <View style={style.rightIcon}>
            <Icon
              type="AntDesign"
              name="minuscircleo"
              size={20}
              color={colors.primary}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

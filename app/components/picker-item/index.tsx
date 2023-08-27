import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {PickerItemProps} from './props';

import style from './style';

export const PickerItem = (props: PickerItemProps) => {
  const {onPress, text} = props;
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
};

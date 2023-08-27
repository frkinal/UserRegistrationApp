import React from 'react';
import {colors} from '../../utils';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {ButtonProps} from './props';
import {container, text as textStyle} from './style';
export const Button = (props: ButtonProps) => {
  const {
    text,
    leftIcon,
    rightIcon,
    preset = 'primary',
    color,
    isLoading = false,
    ...rest
  } = props;
  return (
    <TouchableOpacity {...rest} style={container[preset]}>
      {leftIcon && <Icon name={leftIcon} size={30} color={colors[color]} />}
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[
          textStyle[preset],
          {color: colors[color], display: isLoading ? 'none' : 'flex'},
        ]}
        children={text}
      />
      {isLoading && <ActivityIndicator size="large" color={colors[color]} />}
      {rightIcon && <Icon name={rightIcon} size={30} color={colors[color]} />}
    </TouchableOpacity>
  );
};

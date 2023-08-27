import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {colors} from '../../utils';

const baseContainer: ViewStyle = {
  backgroundColor: colors.black,
  height: 55,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  borderRadius: 12,
  marginVertical: 10,
};
const baseText: TextStyle = {
  color: colors.white,
  fontSize: 16,
  fontWeight: 'bold',
};

export const container = StyleSheet.create({
  primary: {
    ...baseContainer,
    backgroundColor: colors.primary,
  },
  muted: {
    ...baseContainer,
    backgroundColor: colors.textGray,
  },
  cancel: {
    ...baseContainer,
    backgroundColor: colors.danger,
  },
  green: {
    ...baseContainer,
    backgroundColor: colors.green,
  },
  white: {
    ...baseContainer,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
});
export const text = StyleSheet.create({
  primary: {
    ...baseText,
  },
  muted: {
    ...baseText,
  },
  cancel: {
    ...baseText,
    fontSize: 14,
  },
  green: {
    ...baseText,
    fontSize: 14,
  },
  white: {
    ...baseText,
    color: colors.black,
    fontWeight: 'normal',
  },
});

export type Preset = keyof typeof container;

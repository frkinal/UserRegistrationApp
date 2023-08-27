import {TextInputProps as RNTextInputProps} from 'react-native';
import {IconType} from 'react-native-dynamic-vector-icons';
export interface TextInputProps extends RNTextInputProps {
  icon?: string;
  placeholder?: string;
  isPassword?: boolean;
  secPlaceHolder?: string;
  multiInput?: boolean;
  deleteInput?: () => void;
  iconType?: IconType | 'custom';
}

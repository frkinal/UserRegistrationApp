import {TouchableOpacityProps} from 'react-native';
import {Colors} from '../../utils';
import {Preset} from './style';
export interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  preset?: Preset;
  //!TODO: Burasi degistirilecek
  leftIcon?: string;
  rightIcon?: string;
  color: Colors;
  isLoading?: boolean;
}

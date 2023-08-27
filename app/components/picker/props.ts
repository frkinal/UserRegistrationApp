import {TextStyle, ViewStyle} from 'react-native';

export interface PickerProps {
  setSelected: (value: string) => void;
  setSelectedVal: (value: string) => void;
  data: Content[];
  haveSearch?: boolean;
  selectedVal: string;
  text: string;
  headerText: string;
  leftIcon?: boolean;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  dontHaveRightIcon?: boolean;
}

export interface Content {
  title: string;
  id: string;
}

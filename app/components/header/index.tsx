import React from 'react';
import {View, Text} from 'react-native';
import style from './style';
import Icon from 'react-native-dynamic-vector-icons';
import {HeaderProps} from './props';
import {useNavigation} from '@react-navigation/native';

export const Header = (props: HeaderProps) => {
  const navigation = useNavigation<any>();
  const {title, haveBackButton} = props;
  return (
    <View style={style.container}>
      <View style={style.icon_container}>
        {haveBackButton ? (
          <Icon name="left" type="AntDesign" size={30} color="#000" />
        ) : (
          <Icon
            name="menu"
            type="Ionicons"
            size={30}
            color="#000"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        )}
      </View>
      <View style={style.title_container}>
        <Text style={style.title}>{title}</Text>
      </View>
    </View>
  );
};

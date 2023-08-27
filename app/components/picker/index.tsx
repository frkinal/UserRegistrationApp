import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput, PickerItem} from '../';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DynamicIcon from 'react-native-dynamic-vector-icons';

import {Content, PickerProps} from './props';

import style from './style';
import {colors} from '../../utils';

export const Picker = (props: PickerProps) => {
  const [searchText, setsearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Content[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    data,
    setSelected,
    selectedVal,
    setSelectedVal,
    haveSearch,
    text,
    headerText,
    dontHaveRightIcon,
    buttonStyle,
    buttonTextStyle,
  } = props;

  const renderItem = ({item}: {item: Content}) => {
    const {id, title} = item;
    const onPickerItemSelected = () => {
      setSelected(id);
      setSelectedVal(title);
      setModalVisible(false);
    };

    const getPickerText = () => title;

    return (
      <PickerItem
        key={id}
        onPress={onPickerItemSelected}
        text={getPickerText()}
      />
    );
  };

  const renderEmptyComponent = () => {
    const onPickerItemSelected = () => {
      setSelected('-1');
      setSelectedVal('');
      setModalVisible(false);
    };

    return (
      <PickerItem
        onPress={onPickerItemSelected}
        text={'Kapatmak için tıklayın'}
      />
    );
  };

  const filterData = (val: string) => {
    setsearchText(val);
    const temp = data.filter(item =>
      item.title.toLowerCase().includes(val.toLowerCase()),
    );
    setFilteredData(temp);
  };

  const changeModalVisible = () => setModalVisible(!modalVisible);

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={buttonStyle ? buttonStyle : style.button_container}
        onPress={changeModalVisible}>
        <View
          style={
            dontHaveRightIcon ? style.sec_inner_container : {width: '80%'}
          }>
          {selectedVal ? (
            <Text
              numberOfLines={1}
              style={[buttonTextStyle ? buttonTextStyle : style.text]}
              children={selectedVal}
            />
          ) : (
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                buttonTextStyle ? buttonTextStyle : style.text,
                {color: colors.gray},
              ]}
              children={text}
            />
          )}
        </View>
        {!dontHaveRightIcon && (
          <Icon
            name="keyboard-arrow-down"
            style={{maxWidth: '20%'}}
            size={30}
            color={colors.gray}
          />
        )}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={changeModalVisible}>
          <View style={style.modal_container}>
            <TouchableWithoutFeedback>
              <View style={style.inner_modal_container}>
                <View
                  style={
                    haveSearch
                      ? style.header_container
                      : style.second_header_container
                  }>
                  <Text
                    style={style.header_text}
                    type="bold"
                    children={headerText}
                  />
                  <DynamicIcon
                    type="AntDesign"
                    name="close"
                    size={25}
                    color={colors.white}
                    style={style.icon}
                    onPress={changeModalVisible}
                  />
                </View>
                {haveSearch && (
                  <View style={style.text_input_container}>
                    <TextInput
                      placeholder="search"
                      icon="search"
                      iconType="Feather"
                      value={searchText}
                      onChangeText={filterData}
                    />
                  </View>
                )}
                <FlatList
                  data={searchText.length > 0 ? filteredData : data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item + '' + index}
                  ListEmptyComponent={renderEmptyComponent}
                  removeClippedSubviews={true}
                  initialNumToRender={22}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

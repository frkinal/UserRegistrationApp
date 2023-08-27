import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../utils';

const {height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  button_container: {
    backgroundColor: colors.white,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 10,
  },
  inner_container: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sec_inner_container: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 14,
  },
  header_text: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  text_input_container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: '3%',
  },
  modal_container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_modal_container: {
    width: '90%',
    height: height * 0.45,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingVertical: '2%',
  },
  header_container: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  second_header_container: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginBottom: '3%',
  },
});

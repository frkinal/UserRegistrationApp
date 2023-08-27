import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll_container: {
    width: '100%',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
  form_container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_text: {
    fontSize: 10,
    color: 'red',
  },
  bottom_container: {
    width: '100%',
  },
  mask_input: {
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    borderColor: colors.black,
    backgroundColor: colors.white,
    minHeight: 50,
    paddingLeft: 10,
    color: colors.black,
    maxHeight: 100,
  },
});

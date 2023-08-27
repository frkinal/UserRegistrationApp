import {StyleSheet} from 'react-native';

import {colors} from '../../utils';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: '3%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  text: {
    fontSize: 12,
    color: colors.black,
  },
});

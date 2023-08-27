import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  input: {
    minHeight: 50,
    flex: 1,
    paddingLeft: 10,
    color: colors.black,
    maxHeight: 100,
    borderRadius: 10,
  },
  leftIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
  },
  activity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

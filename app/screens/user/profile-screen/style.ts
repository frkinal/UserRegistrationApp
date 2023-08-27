import {StyleSheet} from 'react-native';
import {colors} from '../../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner_container: {
    width: '100%',
  },
  avatar_container: {
    width: '100%',
    alignItems: 'center',
  },
  photo_container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  user_photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  render_item_container: {
    width: 160,
    marginHorizontal: 20,
  },
  user_container: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  user_content_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  user_content: {
    fontSize: 16,
    color: colors.black,
  },
});

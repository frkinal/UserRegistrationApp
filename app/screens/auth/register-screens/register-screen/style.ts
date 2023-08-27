import {StyleSheet} from 'react-native';

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
  radio_button_container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radio_button_item_container: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check_box_container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image_modal_container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  inner_image_modal_container: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: '3%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button_container: {
    width: '45%',
  },
  image_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inner_image_container: {
    width: 70,
    height: 70,
    justifyContent: 'flex-end',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  camera_modal_container: {
    flex: 1,
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    width: '10%',
    height: '10%',
    top: 20,
    right: 10,
  },
  close_icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  camera: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  prepare_camera: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  photo_container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  add_photo_icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  bottom_container: {
    width: '100%',
  },
});

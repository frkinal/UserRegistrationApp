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
  pdf_button_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  show_pdf_button: {
    width: '65%',
  },
  pdf_button: {
    width: '30%',
  },
  error_text: {
    fontSize: 10,
    color: 'red',
  },
  button_container: {
    width: '100%',
  },
  text_input_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet} from 'react-native';
import {GRAY_COLOR, BLACK_COLOR} from '../../constants/color';
import {font} from '../../constants/fonts';

const styles = StyleSheet.create({
  InputFieldContainer: {
    marginTop: 30,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 25,
    marginBottom: 3,
    fontFamily: font.regular,
    color: GRAY_COLOR,
  },
  Icon: (width, height) => {
    return {
      width,
      height,
      marginRight: 15,
    };
  },
  inputBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#7752A2',
    borderRadius: 10,
  },

  TextInputStyleClass: {
    marginHorizontal: 20,
    width: '70%',
    fontSize: 15,
    fontFamily: font.regular,
    color: BLACK_COLOR,
    height: 50,
  },
  textInputWidth: {
    width: '90%',
  },

  placeholderColor: GRAY_COLOR,
});

export default styles;

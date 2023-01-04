import {StyleSheet} from 'react-native';
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
    color: 'gray',
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
    fontSize: 15,
    color: 'black',
    height: 50,
  },
});

export default styles;

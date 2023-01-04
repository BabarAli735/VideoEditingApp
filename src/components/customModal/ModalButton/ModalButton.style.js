import {StyleSheet} from 'react-native';
import {font} from '../../../constants/fonts';

const styles = StyleSheet.create({
  loginButton: (backgroundColor, width, borderColor, borderWidth) => {
    return {
      backgroundColor,
      borderColor,
      borderWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height: 50,
      borderRadius: 40,
    };
  },
  loginBtnTextContainer: {
    textAlign: 'center',
  },
  loginButtonText: color => {
    return {
      color,
      fontSize: 12,
      fontWeight: '400',
      fontFamily: font.regular,
    };
  },
});

export default styles;

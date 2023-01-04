import {StyleSheet} from 'react-native';
import {font} from '../../constants/fonts';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const styles = StyleSheet.create({
  loginButton: (backgroundColor, width, borderColor = APP_PRIMARY_COLOR) => {
    return {
      backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height: 55,
      borderRadius: 50,
      borderWidth: 1,
      borderColor,
    };
  },
  loginBtnTextContainer: {
    textAlign: 'center',
  },
  loginButtonText: color => {
    return {
      color,
      fontSize: 19,
      fontFamily: font.regular,
    };
  },
});

export default styles;

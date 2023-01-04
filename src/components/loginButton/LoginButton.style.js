import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginButton: backgroundColor => {
    return {
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: 50,
      borderRadius: 50,
      borderColor: '#000',
      marginBottom: 10,
    };
  },
  iconContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAndTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  loginBtnTextContainer: {
    paddingLeft: 2,
    width: '77%',
  },
  loginButtonText: color => {
    return {
      color,
      fontSize: 19,
    };
  },
  loginIcon: width => {
    return {
      width,
      height: 20,
      marginLeft: 18,
    };
  },
  iconWidth: width => {
    return {
      width,
    };
  },
});

export default styles;

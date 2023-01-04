import {StyleSheet} from 'react-native';
import {font} from '../../constants/fonts';
import {BLACK_COLOR} from '../../constants/color';

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headIcon: iconBgColor => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: iconBgColor,
      position: 'absolute',
      top: -90,
    };
  },
  headIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    marginVertical: 10,
    fontSize: 12,
    fontFamily: font.regular,
    fontWeight: '400',
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  headIconSize: {
    width: 35,
    height: 35,
  },
  bodyTextHeader: headerTextColor => {
    return {
      color: headerTextColor,
      marginTop: 30,
      fontFamily: font.semiBold,
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    };
  },
  btnRowContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default styles;

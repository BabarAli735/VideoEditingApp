import {StyleSheet} from 'react-native';
import {WHITE_COLOR, BLACK_COLOR} from '../../../constants/color';

const styles = StyleSheet.create({
  mainBlock: {
    flex: 1,
  },
  videoPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  changeVideoBtnContainer: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    right: 40,
  },

  changeVideoBtnText: {
    color: WHITE_COLOR,
    textDecorationLine: 'underline',
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  changeVideoBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWidth: 25,
  playBtn: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
  },
});

export default styles;

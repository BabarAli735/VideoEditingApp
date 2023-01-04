import {StyleSheet} from 'react-native';
import {
  GRAY_COLOR,
  WHITE_COLOR,
  APP_PRIMARY_COLOR,
  BLACK_COLOR,
} from '../../constants/color';
import {font} from '../../constants/fonts';

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: BLACK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: APP_PRIMARY_COLOR,
  },
  radioButtonText: {
    color: GRAY_COLOR,
    fontFamily: font.regular,
    fontSize: 16,
    marginLeft: 6,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {WHITE_COLOR, BLACK_COLOR, GRAY_COLOR} from '../../constants/color';
import {font} from '../../constants/fonts';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  headerTitle: {
    marginLeft: 20,
    paddingTop: 20,
    fontSize: 30,
    fontWeight: '500',
    color: BLACK_COLOR,
  },
  scrolViewContainer: {
    backgroundColor: WHITE_COLOR,
  },
  radioButtonRow: {
    marginHorizontal: 20,
    marginVertical: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  radioButtonRelationShip: {
    marginHorizontal: 20,
    marginVertical: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ButtonRow: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: GRAY_COLOR,
    fontFamily: font.regular,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  videoThumbnailContainer: {
    marginTop: 20,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  thumbnail: {
    width: '85%',
    height: 230,
    borderRadius: 20,
    opacity: 0.4,
  },
  playIcon: {position: 'absolute', top: 90, bottom: 0, zIndex: 1},
  playIconWidth: 40,

  primaryButtonWidth: '40%',
  deleteAccount: {
    marginTop: 20,
    marginBottom: 20,
  },
  fullNameIconWidth: 20,
  fullNameIconHeight: 20,
  professionIconWidth: 25,
  professionIconHeight: 20,
  datePickerIconWidth: 25,
  datePickerIconHeight: 25,
  addressIconWidth: 18.0,
  addressIconHeight: 25.6,

  deleteAccountText: {
    textDecorationLine: 'underline',
    color: BLACK_COLOR,
    fontSize: 14,
    fontFamily: font.regular,
    fontWeight: '600',
  },
});

export default styles;

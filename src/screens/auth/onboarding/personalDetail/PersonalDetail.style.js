import {StyleSheet} from 'react-native';
import {font} from '../../../../constants/fonts';
import {
  GRAY_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
} from '../../../../constants/color';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  headerTitle: {
    marginLeft: 20,
    paddingTop: 20,
    fontSize: 30,
    fontFamily: font.semiBold,
    fontWeight: '600',
    color: BLACK_COLOR,
  },
  scrolViewContainer: {
    backgroundColor: 'white',
  },
  radioButtonRow: {
    marginHorizontal: 20,
    marginVertical: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  radioButtonRowForRelationShipStatus: {
    marginHorizontal: 20,
    marginVertical: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ButtonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: font.regular,
    color: GRAY_COLOR,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  primaryBtnWidth: '40%',
});

export default styles;

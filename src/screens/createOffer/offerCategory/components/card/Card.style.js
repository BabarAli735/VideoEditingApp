import {StyleSheet} from 'react-native';
import {font} from '../../../../../constants/fonts';
import {BLACK_COLOR} from '../../../../../constants/color';
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F1EEF6',
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
  cardLeftImage: {
    width: 48,
    height: 48,
  },
  cardLeftContainer: {
    flex: 0.5,
  },
  middleHeader: {
    color: BLACK_COLOR,
    marginVertical: 2,
    fontFamily: font.regular,
    fontWeight: '500',
    fontSize: 20,
  },
  middleDescription: {
    color: '#706E6E',
    fontFamily: font.regular,
    fontWeight: '500',
    fontSize: 13,
  },
});
export default styles;

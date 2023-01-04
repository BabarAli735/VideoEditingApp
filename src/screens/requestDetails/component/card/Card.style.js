import {StyleSheet} from 'react-native';
import {BLACK_COLOR} from '../../../../constants/color';
import {font} from '../../../../constants/fonts';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F1EEF6',
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardLeftContainer: {
    flex: 0.9,
  },
  leftText: {
    color: BLACK_COLOR,
    fontFamily: font.regular,
    fontWeight: '500',
    fontSize: 18,
  },
  leftSubText: {
    color: '#706E6E',
    fontFamily: font.regular,
    fontWeight: '500',
    fontSize: 12,
  },
  rightText: {
    color: '#7752A2',
    fontFamily: font.regular,
    fontWeight: '500',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default styles;

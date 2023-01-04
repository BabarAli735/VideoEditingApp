import {StyleSheet} from 'react-native';
import {APP_PRIMARY_COLOR, WHITE} from '../constants/color';

const styles = StyleSheet.create({
  buttonCon: {
    backgroundColor: APP_PRIMARY_COLOR,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonTitle: {
    color: WHITE,
    fontSize: 15,
  },
  backCon: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  tickCon: {
    width: 33,
    height: 33,
    backgroundColor: APP_PRIMARY_COLOR,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },
  previewTick: {
    width: 70,
    height: 70,
    backgroundColor: APP_PRIMARY_COLOR,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
  },
  letsConenctCon: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  letsConenctBtn: {
    backgroundColor: APP_PRIMARY_COLOR,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  connectText: {
    fontSize: 16,
    color: WHITE,
  },
});

export default styles;

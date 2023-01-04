import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GREY,
  APP_PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../constants/color';

const styles = StyleSheet.create({
  main: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: GREY,
  },
  detail: {
    color: BLACK_COLOR,
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 25,
  },
  reqCon: {
    borderWidth: 1,
    borderColor: APP_PRIMARY_COLOR,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  btnCon: {
    marginBottom: 20,
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {
  APP_PRIMARY_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
} from '../../../constants/color';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  emptyCompContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyCompContainerText: {
    fontSize: 20,
  },
  primaryBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonWidth: '80%',
  textInputContainer: {
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: APP_PRIMARY_COLOR,
    height: 60,
    color: APP_PRIMARY_COLOR,
    fontSize: 16,
  },
  description: {
    color: BLACK_COLOR,
  },
  placeholderTextColor: GRAY_COLOR,
});

export default styles;

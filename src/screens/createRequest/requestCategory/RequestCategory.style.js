import {StyleSheet} from 'react-native';
import {WHITE_COLOR} from '../../../constants/color';

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default styles;

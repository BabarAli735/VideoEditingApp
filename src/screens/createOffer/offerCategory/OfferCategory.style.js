import {StyleSheet} from 'react-native';
import {WHITE_COLOR} from '../../../constants/color';
const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  submitContainer: {
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  submit: {flex: 0.9, marginVertical: 30},
});
export default styles;

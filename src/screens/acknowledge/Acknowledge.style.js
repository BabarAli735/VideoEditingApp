import {StyleSheet} from 'react-native';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: APP_PRIMARY_COLOR},
  scrollContainer: {
    flex: 0.82,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  submitContainer: {
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  submit: {flex: 0.9, marginTop: 15},
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  backBtnContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backBtn: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default styles;

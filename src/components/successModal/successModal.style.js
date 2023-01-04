import {StyleSheet} from 'react-native';
import {font} from '../../constants/fonts';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: font.regular,
    textAlign: 'center',
    color: APP_PRIMARY_COLOR,
  },
  headIconSize: {
    width: 100,
    height: 100,
  },
  bodyTextHeader: {
    color: 'black',
    marginTop: 30,
    fontFamily: font.bold,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  btnRowContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default styles;

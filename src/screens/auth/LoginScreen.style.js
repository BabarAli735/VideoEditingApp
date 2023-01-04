import {StyleSheet} from 'react-native';
import {APP_PRIMARY_COLOR} from '../../constants/color';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  mainBlock: {
    flex: 1,
    backgroundColor: APP_PRIMARY_COLOR,
  },

  appleButton: {
    width: '80%',
    height: 55,
  },

  logoContainer: {
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  logoMainContainer: {
    marginTop: 30,
  },
  logo: {
    width: 280,
    height: 250,
  },
  loginButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 130,
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  horizontalLine: {
    borderBottomColor: 'white',
    marginHorizontal: 20,
    width: 108,
    height: 2,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  horizontalLineText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },
  bottomTextBlock: {
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomTextSimple: {
    color: '#fff',
    lineHeight: 15,
    textAlign: 'center',
    fontSize: 13,
  },
  bottomTextLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;

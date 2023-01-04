import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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

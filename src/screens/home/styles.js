import {StyleSheet, Dimensions} from 'react-native';
import {
  APP_PRIMARY_COLOR,
  BLACK_COLOR,
  WHITE,
  WHITE_COLOR,
} from '../../constants/color';
const {width, heigth} = Dimensions.get('window');

const styles = StyleSheet.create({
  main: {
    backgroundColor: BLACK_COLOR,
    flex: 1,
  },
  modalText: {
    color: APP_PRIMARY_COLOR,
    marginHorizontal: 30,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  modalView: {
    backgroundColor: '#F1EEF6',
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCon: {
    flex: 1,
    width: width,
    height: heigth,
  },
  modalMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inline: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  bottomCon: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  bMargin: {
    marginBottom: 100,
  },
  userInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 5,
    color: WHITE_COLOR,
  },
  whyConnect: {
    fontWeight: '500',
    marginHorizontal: 20,
    marginTop: 7,
    color: WHITE_COLOR,
  },
  reqInfoText: {
    color: WHITE_COLOR,
    marginHorizontal: 20,
  },
  reqOtherInfo: {
    color: WHITE,
    marginHorizontal: 20,
    fontSize: 10,
    marginTop: 5,
  },
  videoPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  playBtn: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  videoContainer: {width: '100%', height: '100%'},
});

export default styles;

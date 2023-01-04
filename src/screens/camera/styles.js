import {StyleSheet} from 'react-native';
import {APP_PRIMARY_COLOR, WHITE} from '../../constants/color';

const styles = StyleSheet.create({
  camBlock: {
    position: 'absolute',
    bottom: 30,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  cameraBtnBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 55,
    right: 20,
  },

  submitContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },

  submitSubContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submit: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 20,
  },
  mainBlock: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 100,
  },
  bellImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  permissionText: {
    color: APP_PRIMARY_COLOR,
    textAlign: 'center',
    paddingHorizontal: 40,
    fontSize: 17,
  },
  bottomCon: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    bottom: 20,
  },
  iconsContainer: {padding: 20, flex: 1},
  recordHeading: {marginTop: 10, fontSize: 30, fontWeight: '600'},
  cameraIcon: {position: 'absolute', right: 20, bottom: 200},
  torchIcon: {position: 'absolute', right: 20, bottom: 130},
  videoPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  playBtn: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startRec: {
    backgroundColor: 'rgba(156, 88, 243, 1)',
    position: 'absolute',
    top: 11,
    left: 11,
    right: 0,
    width: 34 * 2,
    height: 34 * 2,
    borderRadius: 34,
  },
  recCon: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 100,
  },
  pos: {position: 'relative'},
});

export default styles;

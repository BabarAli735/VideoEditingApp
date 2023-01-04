import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  map: {
    height: 700,
  },
  handleStyle: {
    width: '20%',
    backgroundColor: '#C4C4C4',
  },

  roofStyle: {
    position: 'absolute',
  },
  headerTitle: {
    marginLeft: 20,
    paddingTop: 40,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  childrenOneContainer: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  ContainerLeftSide: {
    flexDirection: 'row',
    width: '75%',
  },

  userAddress: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#000',
  },

  locationPin: {
    width: 16,
    height: 25,
    marginLeft: 20,
    marginRight: 10,
  },

  ContainerRightSide: {
    width: '10%',
  },
  editIcon: {
    width: 20,
    height: 20,
  },

  primaryBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnWidth: '80%',
});

export default styles;

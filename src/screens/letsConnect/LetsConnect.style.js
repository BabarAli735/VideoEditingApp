import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffff'},
  scrollContainer: {
    flex: 0.82,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  venueContainer: {flex: 1, flexDirection: 'row'},
  venueText: {flex: 0.75},
  venueDistance: {
    flex: 0.28,
    alignItems: 'center',
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

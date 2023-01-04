import {StyleSheet} from 'react-native';
import {WHITE_COLOR} from '../../../constants/color';
import {font} from '../../../constants/fonts';

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  accordianContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  accordianTitle: {
    fontFamily: font.regular,
    fontSize: 20,
    fontWeight: '400',
  },
  accordianIcon: {
    width: 31,
    height: 27,
  },
  activityIndicator: {
    flex: 1,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  subSubCategoryContainer: {
    backgroundColor: 'rgba(147,112,219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
  },
  subSubCategorySubContainer: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: '#f4f4f4',
    width: '100%',
    paddingTop: 14,
    borderRadius: 20,
    marginBottom: 12,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  subSubCategoryTitle: {
    fontSize: 13,
    color: '#000',
    fontFamily: font.regular,
  },
});

export default styles;

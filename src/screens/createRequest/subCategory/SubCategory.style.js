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
  accordionContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  accordionTitle: {
    fontFamily: font.regular,
    fontSize: 20,
    fontWeight: '400',
  },
  accordionIcon: {
    width: 31,
    height: 27,
  },
  activityIndicator: {
    flex: 1,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  subSubCategoryContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subSubInnerCategoryContainer: {
    backgroundColor: 'rgba(147,112,219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 20,
  },
  subSubCategorySubContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderColor: '#f4f4f4',
    width: '100%',
    borderRadius: 20,
  },
  subSubCategoryTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: font.regular,
  },
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default styles;

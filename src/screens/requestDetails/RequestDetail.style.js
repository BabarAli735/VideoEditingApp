import {StyleSheet} from 'react-native';
import {WHITE_COLOR, BLACK_COLOR, GRAY_COLOR} from '../../constants/color';
import {font} from '../../constants/fonts';

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  submitContainer: {
    flex: 0.18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalSubmitContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  modalSubmit: {
    flex: 0.9,
  },
  textArea: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    color: BLACK_COLOR,
    textAlignVertical: 'top',
    height: 150,
    justifyContent: 'flex-start',
  },
  modalContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    justifyContent: 'center',
  },
  modalSubContainer: {padding: 25},
  modalHeader: {
    textAlign: 'center',
    fontFamily: font.regular,
    fontWeight: '600',
    fontSize: 25,
    width: '100%',
    color: BLACK_COLOR,
  },
  modalDescription: {
    marginVertical: 20,
    fontFamily: font.regular,
    fontSize: 15,
    fontWeight: '400',
    color: BLACK_COLOR,
  },
  textAreaTitle: (color = GRAY_COLOR) => {
    return {
      fontSize: 20,
      fontFamily: font.regular,
      fontWeight: '600',
      marginBottom: 4,
      color,
    };
  },
  whoCanViewtextTitle: {
    fontSize: 15,
    fontFamily: font.regular,
    fontWeight: '600',
    marginBottom: 4,
    color: GRAY_COLOR,
  },
  wordLimit: {
    fontSize: 10,
    fontFamily: font.regular,
    alignSelf: 'flex-end',
    color: BLACK_COLOR,
  },
  applicants: {fontSize: 15, color: GRAY_COLOR},
  slider: {
    width: '100%',
    height: 20,
  },
  minimumValue: 0,
  maxvalue: 33,
  rangeMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
  },
  range: {fontSize: 10, color: '#000'},
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  sliderContainer: {
    paddingBottom: 20,
  },
  rangeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  genderButton: (borderWidth, borderColor) => {
    return {
      width: '30%',
      height: 45,
      borderWidth,
      borderColor,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
  genderButtonText: (color = '#000') => {
    return {
      color,
      textAlign: 'center',
    };
  },

  mulitSliderContainer: {
    marginBottom: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerHeightIos: 26.5,
  markerWidthIos: 26.5,
  markerHeightAndroid: 13,
  markerWidthAndroid: 13,
  markerBorderRadiusAndroid: 50,
  trackStylePaddingAndroid: 1.1,
  trackStylePaddingIos: 1.8,
  trackStyleBackgroundColor: '#EDF0F1',
  touchDimensionsHeight: 40,
  touchDimensionsWidth: 40,
  touchDimensionsSlipDisplacement: 40,
  touchDimensionsBorderRadius: 20,
  sliderLengthIos: 260,
  sliderLengthAndroid: 240,
  numberOfLines: 2,
  maxLength: 160,
  submit: {flex: 0.9, marginVertical: 30},
});

export default styles;

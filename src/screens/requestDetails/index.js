import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import Header from '../../components/SimpleHeader';
import styles from './RequestDetail.style';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Platform} from 'react-native';

import {
  APP_PRIMARY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
} from '../../constants/color';
import Card from './component/card';
import PrimaryButton from '../../components/primaryButton';
import {useRequestDetails} from '../../stores/createRequest';
import {
  REQUEST_DETAILS,
  whoCanViewGender,
  DATE_TIME_FORMAT,
} from '../../constants/constants';
import {isNull, isUndefined} from 'lodash';
import moment from 'moment';
import {useMaps} from '../../stores/useMaps';

const RequestDetail = ({navigation}) => {
  const setRequestDetail = useRequestDetails(state => state.setRequestDetail);
  const {request, offer} = useRequestDetails(state => state);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isApplicantsModalVisible, setIsApplicantModalVisible] =
    useState(false);
  const [isWhoCanViewModalVisible, setIsWhoCanViewModalVisible] =
    useState(false);
  const [requestTitle, setRequestTitle] = useState(null);
  const [trackingApplicants, setTrackingApplicants] = useState(0);
  const [trackingDistanceFromSlider, setTrackingDistanceFromSlider] =
    useState(1);
  const [distanceFromSliderOnSave, setDistanceFromSliderOnSave] =
    useState(undefined);
  const [applicants, setApplicants] = useState(null);
  const [isActiveGender, setIsActiveGender] = useState(null);
  const [multiSliderValue, setMultiSliderValue] = useState([16, 100]);
  const [ageRangeWhenSaveClicked, SetageRangeWhenSaveClicked] =
    useState(undefined);
  const [trackingRequestTitle, setTrackingRequestTitle] = useState(null);
  const multiSliderValuesChange = values => setMultiSliderValue(values);
  let ageRange = `${multiSliderValue[0]} -  ${multiSliderValue[1]} `;
  const [date, setDate] = useState(null);
  const [expriyDate, setExpiryDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [expiryDatePickerOpen, setExpiryDatePickerOpen] = useState(false);
  const {formattedAddress} = useMaps(state => state);
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  const openExpiryDatePicker = () => {
    setExpiryDatePickerOpen(true);
  };
  const onSelect = idate => {
    let formattedDate = moment(idate).format(
      DATE_TIME_FORMAT.dateAndTimeFormate,
    );
    setDatePickerOpen(false);
    setDate(formattedDate);
  };
  const onSelectExpiryDate = idate => {
    let formattedDate = moment(idate).format(
      DATE_TIME_FORMAT.dateAndTimeFormate,
    );

    setExpiryDatePickerOpen(false);
    setExpiryDate(formattedDate);
  };

  const onCancel = () => {
    setDatePickerOpen(false);
    setExpiryDatePickerOpen(false);
  };

  const setRangeOfApplicants = range => {
    if (range === 0) {
      setTrackingApplicants(1);
    } else {
      setTrackingApplicants(parseInt(range, 10));
    }
  };

  const openApplicantsModal = () => {
    setIsApplicantModalVisible(true);
  };

  const getTitle = e => {
    setTrackingRequestTitle(e);
  };
  const openModal = () => {
    setTrackingRequestTitle(requestTitle);
    setModalVisible(true);
  };
  const onSave = () => {
    let refactoredRequestTitle = trackingRequestTitle?.trim();
    setRequestTitle(refactoredRequestTitle);
    setTrackingRequestTitle(null);
    setModalVisible(false);
  };
  const onSaveApplicant = () => {
    setApplicants(trackingApplicants);
    setTrackingApplicants(null);
    setIsApplicantModalVisible(false);
  };
  const clickOutSideOfModal = () => {
    setTrackingRequestTitle(null);
    setModalVisible(false);
  };

  const goToRequestCategory = () => {
    navigation.navigate('Root', {screen: 'CreateRequest'});
  };
  const goToOfferCategory = () => {
    navigation.navigate('Root', {screen: 'CreateOffer'});
  };
  const setRangeOfDistance = range => {
    if (range === 0) {
      setTrackingDistanceFromSlider(1);
    } else {
      setTrackingDistanceFromSlider(parseInt(range, 10));
    }
  };

  const outSideClickOfModal = () => {
    setDistanceFromSliderOnSave(undefined);
    SetageRangeWhenSaveClicked(undefined);
    setIsWhoCanViewModalVisible(false);
    setIsApplicantModalVisible(false);
  };
  const openWhoCanViewModal = () => {
    setIsWhoCanViewModalVisible(true);
  };
  const applicantsOnSave = () => {
    setApplicants(trackingApplicants);
    setIsApplicantModalVisible(false);
  };

  const onWhoCanViewSave = () => {
    SetageRangeWhenSaveClicked(ageRange);
    setDistanceFromSliderOnSave(trackingDistanceFromSlider);
    if (isUndefined(whoCanViewGender[isActiveGender])) {
      Alert.alert(
        REQUEST_DETAILS.whoCanViewAletTitle,
        REQUEST_DETAILS.whoCanViewAlertMsg,
      );
      setIsWhoCanViewModalVisible(true);
    } else {
      setIsWhoCanViewModalVisible(false);
    }
  };

  const navigateToMap = () => {
    navigation.navigate('Root', {
      screen: 'Maps',
    });
  };

  const submitRequestDetailAndNavigateToSummary = () => {
    if (
      isNull(requestTitle) ||
      isNull(applicants) ||
      isUndefined(ageRangeWhenSaveClicked) ||
      isNull(date) ||
      isNull(expriyDate) ||
      isNull(formattedAddress)
    ) {
      Alert.alert(REQUEST_DETAILS.alertTitle, REQUEST_DETAILS.alertMessage, [
        {text: 'OK', onPress: () => console.info('OK Pressed')},
      ]);
    } else {
      const data = {
        request,
        title: requestTitle,
        offer,
        acceptingApplicants: applicants,
        dateAndTime: date,
        expiryDateAndTime: expriyDate,
        gender: whoCanViewGender[isActiveGender],
        age: ageRangeWhenSaveClicked,
        miles: distanceFromSliderOnSave,
        venue: formattedAddress,
      };
      setRequestDetail(data);
      navigation.navigate('requestData');
    }
  };

  const renderGender = whoCanViewGender.map((gender, index) => {
    return (
      <Pressable
        key={index}
        onPress={() => setIsActiveGender(index)}
        style={[
          styles.genderButton(
            isActiveGender === index ? 2 : 1,
            isActiveGender === index ? APP_PRIMARY_COLOR : BLACK_COLOR,
          ),
        ]}>
        <Text
          style={[
            styles.genderButtonText(
              isActiveGender === index ? APP_PRIMARY_COLOR : BLACK_COLOR,
            ),
          ]}>
          {gender}
        </Text>
      </Pressable>
    );
  });

  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <Header
        title={REQUEST_DETAILS.headerTitle}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
        barStyle="light-content"
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card
          onClick={goToRequestCategory}
          title={REQUEST_DETAILS.request}
          subTitle={isNull(request) ? REQUEST_DETAILS.insertRequest : request}
          cta={REQUEST_DETAILS.personalize}
        />
        <Card
          onClick={openModal}
          title={REQUEST_DETAILS.title}
          subTitle={requestTitle ? requestTitle : REQUEST_DETAILS.insertTitle}
          cta={REQUEST_DETAILS.edit}
        />
        <Card
          onClick={goToOfferCategory}
          title={REQUEST_DETAILS.offer}
          subTitle={isNull(offer) ? REQUEST_DETAILS.offerSubTitle : offer}
          cta={REQUEST_DETAILS.personalize}
        />
        <Card
          onClick={openApplicantsModal}
          title={REQUEST_DETAILS.acceptingApplicants}
          subTitle={
            applicants ? applicants : REQUEST_DETAILS.applicantPlaceholder
          }
          cta={REQUEST_DETAILS.add}
        />

        <Card
          onClick={openDatePicker}
          title={REQUEST_DETAILS.dateAndTime}
          subTitle={date ? date : REQUEST_DETAILS.dateAndTimeSubTitle}
          cta={REQUEST_DETAILS.schedule}
        />
        <Card
          onClick={openExpiryDatePicker}
          title={REQUEST_DETAILS.expiryDateAndTime}
          subTitle={
            expriyDate ? expriyDate : REQUEST_DETAILS.expirydateAndTimeSubTitle
          }
          cta={REQUEST_DETAILS.schedule}
        />
        <Card
          onClick={openWhoCanViewModal}
          title={REQUEST_DETAILS.whoCanView}
          subTitle={`${
            isUndefined(whoCanViewGender[isActiveGender])
              ? REQUEST_DETAILS.whoCanViewGenderDisplay
              : whoCanViewGender[isActiveGender]
          },  ${
            isUndefined(ageRangeWhenSaveClicked)
              ? REQUEST_DETAILS.whoCanViewAgeDisplay
              : ageRangeWhenSaveClicked + REQUEST_DETAILS.whoCanViewYearDisplay
          }, ${
            isUndefined(distanceFromSliderOnSave)
              ? REQUEST_DETAILS.whoCanViewAreaDisplay
              : REQUEST_DETAILS.whoCanViewCharAtDisplay +
                distanceFromSliderOnSave +
                REQUEST_DETAILS.whoCanViewMilesDisplay
          } `}
          cta={REQUEST_DETAILS.edit}
        />
        <Card
          onClick={navigateToMap}
          title={REQUEST_DETAILS.venue}
          subTitle={
            isNull(formattedAddress)
              ? REQUEST_DETAILS.venueSubTitle
              : formattedAddress
          }
          cta={REQUEST_DETAILS.edit}
        />
        <View style={styles.submitContainer}>
          <View style={styles.submit}>
            <PrimaryButton
              loginHandler={submitRequestDetailAndNavigateToSummary}
              title={REQUEST_DETAILS.done}
              backgroundColor={APP_PRIMARY_COLOR}
              color={WHITE_COLOR}
            />
          </View>
        </View>
      </ScrollView>
      {/* Two date pickers: one for request start date and time and other is for expiry */}
      <DatePicker
        modal
        minimumDate={new Date()}
        title={REQUEST_DETAILS.dateAndTimeTitle}
        textColor={APP_PRIMARY_COLOR}
        open={datePickerOpen}
        date={new Date()}
        mode={'datetime'}
        onConfirm={onSelect}
        onCancel={onCancel}
      />
      <DatePicker
        modal
        title={REQUEST_DETAILS.dateAndTimeTitleExpiry}
        textColor={APP_PRIMARY_COLOR}
        open={expiryDatePickerOpen}
        minimumDate={new Date()}
        date={new Date()}
        mode={'datetime'}
        onConfirm={onSelectExpiryDate}
        onCancel={onCancel}
      />
      <Modal onBackdropPress={clickOutSideOfModal} isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Text style={styles.modalHeader}>
              {REQUEST_DETAILS.modalHeader}
            </Text>
            <Text style={styles.modalDescription}>
              {REQUEST_DETAILS.modalDescription}
            </Text>
            <View style={styles.textAreaContainer}>
              <Text style={styles.textAreaTitle(BLACK_COLOR)}>
                {REQUEST_DETAILS.title}
              </Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                onChangeText={getTitle}
                value={trackingRequestTitle}
                blurOnSubmit={true}
                numberOfLines={styles.numberOfLines}
                maxLength={styles.maxLength}
                multiline={true}
              />
              <Text
                style={[
                  styles.wordLimit,
                  {
                    color:
                      trackingRequestTitle?.length === 160 ? 'red' : '#000',
                  },
                ]}>
                {trackingRequestTitle?.length ? trackingRequestTitle.length : 0}
                / {styles.maxLength}
              </Text>
            </View>
          </View>
          <View style={styles.modalSubmitContainer}>
            <View style={styles.modalSubmit}>
              <PrimaryButton
                loginHandler={onSave}
                title={REQUEST_DETAILS.modalButtonForTitle}
                backgroundColor={APP_PRIMARY_COLOR}
                color={WHITE_COLOR}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={outSideClickOfModal}
        isVisible={isApplicantsModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Text style={styles.modalHeader}>
              {REQUEST_DETAILS.applicantsModalHeader}
            </Text>
            <Text style={styles.modalDescription}>
              {REQUEST_DETAILS.applicantModalDescription}
            </Text>
            <Text style={styles.textAreaTitle}>
              {REQUEST_DETAILS.applicantsTitle}{' '}
              <Text style={styles.applicants}>{trackingApplicants}</Text>
            </Text>

            <Slider
              style={styles.slider}
              minimumValue={styles.minimumValue}
              maximumValue={styles.maxvalue}
              onValueChange={setRangeOfApplicants}
              thumbTintColor={APP_PRIMARY_COLOR}
              minimumTrackTintColor={APP_PRIMARY_COLOR}
              maximumTrackTintColor={'#F1EEF6'}
            />
            <View style={styles.rangeMainContainer}>
              <View style={styles.rangeContainer}>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.minApplicants}
                </Text>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.maxApplicants}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.modalSubmitContainer}>
            <View style={styles.modalSubmit}>
              <PrimaryButton
                loginHandler={onSaveApplicant}
                title={REQUEST_DETAILS.modalButtonForTitle}
                backgroundColor={APP_PRIMARY_COLOR}
                color={WHITE_COLOR}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={outSideClickOfModal}
        isVisible={isApplicantsModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Text style={styles.modalHeader}>
              {REQUEST_DETAILS.applicantsModalHeader}
            </Text>
            <Text style={styles.modalDescription}>
              {REQUEST_DETAILS.applicantModalDescription}
            </Text>
            <Text style={styles.textAreaTitle}>
              {REQUEST_DETAILS.applicantsTitle}{' '}
              <Text style={styles.applicants}>{trackingApplicants}</Text>
            </Text>

            <Slider
              style={styles.slider}
              minimumValue={styles.minimumValue}
              maximumValue={styles.maxvalue}
              onValueChange={setRangeOfApplicants}
              thumbTintColor={APP_PRIMARY_COLOR}
              minimumTrackTintColor={APP_PRIMARY_COLOR}
              maximumTrackTintColor={'#F1EEF6'}
            />
            <View style={styles.rangeMainContainer}>
              <View style={styles.rangeContainer}>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.minApplicants}
                </Text>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.maxApplicants}
                </Text>
              </View>

              {/* Here */}
            </View>
          </View>
          <View style={styles.modalSubmitContainer}>
            <View style={styles.modalSubmit}>
              <PrimaryButton
                loginHandler={applicantsOnSave}
                title={REQUEST_DETAILS.modalButtonForTitle}
                backgroundColor={APP_PRIMARY_COLOR}
                color={WHITE_COLOR}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={outSideClickOfModal}
        isVisible={isWhoCanViewModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubContainer}>
            <Text style={styles.modalHeader}>
              {REQUEST_DETAILS.whoCanViewModalHeader}
            </Text>
            <Text style={styles.modalDescription}>
              {REQUEST_DETAILS.whoCanViewModalDescription}
            </Text>
            <Text style={styles.whoCanViewtextTitle}>
              {REQUEST_DETAILS.whoCanViewGender}
            </Text>
            <View style={styles.genderContainer}>{renderGender}</View>
            <View style={styles.sliderContainer}>
              <Text style={styles.whoCanViewtextTitle}>
                {REQUEST_DETAILS.whoCanViewAge}
                <Text style={styles.applicants}>{ageRange}</Text>
              </Text>

              <View style={styles.mulitSliderContainer}>
                <MultiSlider
                  markerStyle={{
                    ...Platform.select({
                      ios: {
                        height: styles.markerHeightIos,
                        width: styles.markerWidthIos,
                        backgroundColor: APP_PRIMARY_COLOR,
                      },
                      android: {
                        height: styles.markerHeightAndroid,
                        width: styles.markerWidthAndroid,
                        borderRadius: styles.markerBorderRadiusAndroid,
                        backgroundColor: APP_PRIMARY_COLOR,
                      },
                    }),
                  }}
                  selectedStyle={{
                    backgroundColor: APP_PRIMARY_COLOR,
                  }}
                  trackStyle={{
                    ...Platform.select({
                      android: {
                        padding: styles.trackStylePaddingAndroid,
                        backgroundColor: styles.trackStyleBackgroundColor,
                      },
                      ios: {
                        padding: styles.trackStylePaddingIos,
                        backgroundColor: styles.trackStyleBackgroundColor,
                      },
                    }),
                  }}
                  touchDimensions={{
                    height: styles.touchDimensionsHeight,
                    width: styles.touchDimensionsWidth,
                    borderRadius: styles.touchDimensionsBorderRadius,
                    slipDisplacement: styles.touchDimensionsSlipDisplacement,
                  }}
                  values={[multiSliderValue[0], multiSliderValue[1]]}
                  sliderLength={
                    Platform.OS === 'ios'
                      ? styles.sliderLengthIos
                      : styles.sliderLengthAndroid
                  }
                  onValuesChange={multiSliderValuesChange}
                  min={REQUEST_DETAILS.whoCanViewAgeMin}
                  max={REQUEST_DETAILS.whoCanViewAgeMax}
                  allowOverlap={false}
                  minMarkerOverlapDistance={10}
                />
              </View>
              <View style={styles.rangeWrapper}>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.whoCanViewAgeMin}
                </Text>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.whoCanViewAgeMax}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.whoCanViewtextTitle}>
                {REQUEST_DETAILS.whoCanViewDistance}
                <Text style={styles.applicants}>
                  {trackingDistanceFromSlider}
                </Text>
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={REQUEST_DETAILS.whoCanViewDistanceMin}
                maximumValue={REQUEST_DETAILS.whoCanViewDistanceMax}
                onValueChange={setRangeOfDistance}
                thumbTintColor={APP_PRIMARY_COLOR}
                minimumTrackTintColor={APP_PRIMARY_COLOR}
                maximumTrackTintColor={'#F1EEF6'}
              />

              <View style={styles.rangeWrapper}>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.whoCanViewDistanceMin}
                </Text>
                <Text style={styles.range}>
                  {REQUEST_DETAILS.whoCanViewDistanceMax}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.modalSubmitContainer}>
            <View style={styles.modalSubmit}>
              <PrimaryButton
                loginHandler={onWhoCanViewSave}
                title={REQUEST_DETAILS.modalButtonForTitle}
                backgroundColor={APP_PRIMARY_COLOR}
                color={WHITE_COLOR}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RequestDetail;

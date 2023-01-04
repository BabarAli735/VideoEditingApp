import React from 'react';
import {View, Modal, Text, Animated} from 'react-native';

import styles from './CustomModal.style';
import ModalButton from './ModalButton';
import FastImage from 'react-native-fast-image';
import {GRAY_COLOR, BLACK_COLOR} from '../../constants/color';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => {
          setShowModal(false);
        }, 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    };
    toggleModal();
  }, [scaleValue, visible]);

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const CustomModal = ({
  visible,
  headerTitle,
  bodyText,
  headerTextColor = BLACK_COLOR,
  bodyTextColor = GRAY_COLOR,
  icon,
  onPressBtnLeft,
  onPressBtnRight,
  leftBtnTitle,
  rightBtnTitle,
  btnLeftBorderWidth,
  btnLeftBorderColor,
  btnLeftColor,
  isDeletePopup,
  btnRightBgColor,
  iconBgColor = '#FFD9D9',
}) => {
  return visible ? (
    <View>
      <ModalPoup visible={visible}>
        <View style={styles.headIconContainer}>
          <View style={styles.headIcon(iconBgColor)}>
            <FastImage source={icon} style={styles.headIconSize} />
          </View>
        </View>
        <Text style={styles.bodyTextHeader(headerTextColor)}>
          {headerTitle}
        </Text>

        {isDeletePopup && <Text style={styles.bodyText}>{bodyText}</Text>}
        <View style={styles.btnRowContainer}>
          <ModalButton
            title={leftBtnTitle}
            width="40%"
            onPress={onPressBtnLeft}
            borderWidth={btnLeftBorderWidth}
            borderColor={btnLeftBorderColor}
            color={btnLeftColor}
          />
          <ModalButton
            onPress={onPressBtnRight}
            title={rightBtnTitle}
            width="40%"
            color={'white'}
            backgroundColor={btnRightBgColor}
          />
        </View>
      </ModalPoup>
    </View>
  ) : null;
};

export default CustomModal;

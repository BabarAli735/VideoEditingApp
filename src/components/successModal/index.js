import React from 'react';
import {View, Modal, Text, Animated} from 'react-native';
import styles from './successModal.style';
import successIcon from '../../assets/success_icon.png';
import FastImage from 'react-native-fast-image';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
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

const SucccessModal = ({visible, successMsg}) => {
  return visible ? (
    <View>
      <ModalPoup visible={visible}>
        <View style={styles.headIconContainer}>
          <View style={styles.headIcon}>
            <FastImage source={successIcon} style={styles.headIconSize} />
          </View>
        </View>

        <Text style={styles.bodyText}>{successMsg}</Text>
      </ModalPoup>
    </View>
  ) : null;
};

export default SucccessModal;

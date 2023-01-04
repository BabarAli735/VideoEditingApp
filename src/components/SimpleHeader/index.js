import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../buttons/IconButton';
import isEmpty from 'lodash/isEmpty';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ION_ICONS} from '../../constants/icons';

const Header = ({
  title,
  onPress,
  backgroundColor,
  barStyle,
  titleColor,
  color,
}) => {
  return (
    <SafeAreaView style={{backgroundColor}}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
      <View style={[styles.iconsContainer, {backgroundColor}]}>
        <IconButton icon={ION_ICONS.checkOutline} onPress={onPress} />
        {!isEmpty(title) && (
          <Text style={styles.recordHeading(titleColor)}>{title}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  title: '',
  backgroundColor: '#ffff',
  barStyle: 'default',
  color: '#ffff',
};

Header.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  iconsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  recordHeading: (titleColor = '#ffff') => {
    return {
      marginTop: 10,
      paddingLeft: 20,
      fontSize: 35,
      fontWeight: '600',
      fontFamily: 'Montserrat',
      color: titleColor,
    };
  },
});

export default Header;

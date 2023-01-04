import {React} from 'react';
import {Pressable, View, Text} from 'react-native';
import styles from './RadioButton.style';

export const RadioButton = ({onPress, selected, children}) => {
  return (
    <Pressable
      style={styles.radioButtonContainer}
      onPress={() => onPress(children)}>
      <View style={styles.radioButton}>
        {selected === children ? <View style={styles.radioButtonIcon} /> : null}
      </View>
      <View>
        <Text style={styles.radioButtonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

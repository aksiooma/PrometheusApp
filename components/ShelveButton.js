import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ShelveButton = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};
const width = Dimensions.get('window').width - 44;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'tomato',
    padding: 13,
    borderRadius: width * 0.125 * 0.5,
    elevation: 5,
    overflow:'hidden'
    
  },
});

export default ShelveButton;
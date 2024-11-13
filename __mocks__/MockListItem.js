import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default ({ title, url }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      testID="list-item_pressable"
      onPress={() => navigation.navigate({ title, url })}
    >
      {title}
    </TouchableOpacity>
  )
}
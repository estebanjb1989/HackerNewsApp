import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawer = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const navigateTo = (route: string) => () => navigation.navigate(route);

  return (
    <SafeAreaView>
      <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={navigateTo('Home')}>
          <View style={styles.optionContainer}>
            <Text>⦾ Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateTo('Favorites')}>
          <View style={styles.optionContainer}>
            <Text>⦾ Favorites</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateTo('Deleted')}>
          <View style={styles.optionContainer}>
            <Text>⦾ Deleted Articles</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateTo('Settings')}>
          <View style={styles.optionContainer}>
            <Text>⦾ Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    paddingTop: 80,
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default CustomDrawer;

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../globalStyles/color';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 2 seconds
  }, []);



  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  if (!isVisible) {

    retrieveUserData()


  }


  async function retrieveUserData() {
    try {
      const user = await AsyncStorage.getItem('SET_USER_DATA');

      console.log('user',user)
      if (user != null) {
        // const parsedUser = JSON.parse(user);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        });

      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
       

      }
    } catch (error) {
      // Handle error
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TRIP PLANNER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.primaryColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
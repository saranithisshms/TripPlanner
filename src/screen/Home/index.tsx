import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet, Image, } from 'react-native';
import { Header, HeaderProps, } from '@rneui/themed';
import auth from '@react-native-firebase/auth';

import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface HomeState {
  email: string;
  password: string;
}

const HomeScreen: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    email: '',
    password: '',
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();



  async function logout() {

    await AsyncStorage.removeItem('SET_USER_DATA');
    navigation.push('Login');
    auth().signOut();

  }


  function gotoMakeTrip() {
    navigation.push('CreateTrip')

  }


  return (
    <View style={{ width: '100%', height: '100%', }}>
      <Header
        containerStyle={styles.headerContainer}
        statusBarProps={{ backgroundColor: 'transparent' }}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
              logout();
            }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>LogOut</Text>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'MAKE A TRIP PLAN', style: styles.heading }}
      />
      <View style={{ padding: 5, margin: 10 }}>
        <TouchableOpacity style={styles.borderButton} onPress={() => gotoMakeTrip()}>
          <Text style={styles.textcolorBtn}>ADD NEW TRIP + </Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC0CB',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textcolorBtn: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  borderButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderStyle: 'dotted',
    alignItems: 'center'
  },
});


export default HomeScreen;
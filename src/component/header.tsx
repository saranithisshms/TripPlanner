import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, HeaderProps, } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import colors from '../globalStyles/color';



const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();



const HeaderComponent: React.FC<{ title: string; left?: any; right?: any; }> = ({ title, left, right }) => {

  async function logout() {

    await AsyncStorage.removeItem('SET_USER_DATA');
    navigation.push('Login');
    auth().signOut();

  }

  const myRightComponent = () => {

    if (right === 'logout') {
      return (
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
            logout();
          }}>
            <AntDesign name="logout" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      );
    }
  }



  const leftHandler = () => {

    if (left === 'back') {
      return (
        <View style={styles.headerRight}>
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
            logout();
          }}>
            <AntDesign name="logout" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  


  return (
    <Header
      containerStyle={styles.headerContainer}
      statusBarProps={{ backgroundColor: 'transparent' }}
      rightComponent={myRightComponent()}
      leftComponent={leftHandler()}
      centerComponent={{ text:title, style: styles.heading }}
    />
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


});

export default HeaderComponent;
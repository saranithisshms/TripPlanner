import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../globalStyles/color';
import Toast from 'react-native-simple-toast';

interface LoginState {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {

    if (state.email != "" && state.password != '') {

      try {

        const response = await firebase.auth().signInWithEmailAndPassword(state.email, state.password);
        if (response != null) {

          try {
            await AsyncStorage.setItem('SET_USER_DATA', response.user.uid);
            navigation.push('Home');
            setState({ ...state, email: '',password:'' })
            Toast.show('Success message', Toast.SHORT);
          } catch (error) {
            
            Toast.show('Login is Failed', Toast.LONG);
          }

        }


      } catch (error) {
        // Handle error
        console.log(error)
        Toast.show('Login is Failed', Toast.LONG, {
          backgroundColor: 'blue',
        });
      }
    } else {

      Alert.alert('Please all Details to Login')
    }

  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function handlePress() {
    navigation.push('Register');
  }

  return (
    <View style={styles.screenMargin}>
      <View style={styles.logingap}>

        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>   Login ! Make your Plane True</Text>

      </View>
      <View style={styles.smallgap}>
        <TextInput
          label="Email"
          onChangeText={(text) => setState({ ...state, email: text })}
          value={state.email}
          style={styles.textinputColor}
          mode="outlined"

        />
      </View>
      <View style={styles.gap}>
        <TextInput
          label="Password"
          onChangeText={(text) => setState({ ...state, password: text })}
          value={state.password}
          secureTextEntry
          style={styles.textinputColor}
          mode="outlined"
        />
      </View>
      <View style={styles.gap}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={styles.textcolorBtn}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.registerView}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.registertext}>Register for New user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 15
  },
  gap: {
    paddingTop: 15
  },
  screenMargin: {
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    flex: 1
  },
  smallgap: {
    paddingTop: 15
  },
  textinputColor: {
    backgroundColor: '#ffff'
  },
  registertext: {
    fontWeight: 'bold',
    fontSize: 18
  },
  registerView: {
    paddingTop: 15, alignItems: 'center',
  },
  textcolorBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  logingap: {
    paddingBottom: 10
  }
});


export default LoginScreen;
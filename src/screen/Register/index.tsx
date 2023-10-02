import React, { useState } from 'react';
import { Button, View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import firebase from '@react-native-firebase/app';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../../globalStyles/color';

interface RegistrationState {
  email: string;
  password: string;
}

const RegistrationScreen: React.FC = () => {
  const [state, setState] = useState<RegistrationState>({
    email: '',
    password: '',
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {

    if (state.email != '' && state.password != '') {
      try {
        const response = await auth().createUserWithEmailAndPassword(state.email, state.password);


        if(response != null){
          navigation.push('Login');
          setState({ ...state, email: '',password:'' })
          console.log(response)
        }

      
      } catch (error) {
        console.log(error)
      }

    }
    else {

      Alert.alert('All Fields Are Required  to Resigster')
    }
  };

  return (
    <View style={styles.screenMargin}>
      <View style={styles.logingap}>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Register ! Get Plans Come True</Text>
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
      {/* <View style={styles.gap}>
        <TextInput
          label="Password"
          onChangeText={(text) => setState({ ...state, password: text })}
          value={state.password}
          secureTextEntry
          style={styles.textinputColor}
          mode="outlined"
        />
      </View> */}
      <View style={styles.gap}>
        <TouchableOpacity onPress={handleRegister}>
          <View style={styles.button}>
            <Text style={styles.textcolorBtn}>Register</Text>
          </View>
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
    paddingTop: 20
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

export default RegistrationScreen;
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screen/Login';
import RegistrationScreen from '../screen/Register';
import Header from '../component/header';
import HomeScreen from '../screen/Home';
import SplashScreen from '../screen/SplashScreen';
import CreateTripScreen from '../screen/CreateTrip';
import { NavigationContainer } from '@react-navigation/native';
import TaskListing from '../screen/TaskLising';
import CreateTaskTripScreen from '../screen/CreateTask';


const Stack = createStackNavigator();

const navigationPage = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Splash"  screenOptions={{   headerShown: false, }}   >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen}
        />
        <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
        <Stack.Screen name="TaskListing" component={TaskListing} />
        <Stack.Screen name="CreateTask" component={CreateTaskTripScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigationPage;
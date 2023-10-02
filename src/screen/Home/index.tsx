import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet, Image, Linking, LogBox } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Header, HeaderProps, } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icon } from '@rneui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../globalStyles/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SQLite from 'react-native-sqlite-storage';
import TripCard from '../../component/cardTrip';


LogBox.ignoreLogs(["same key"]);

const HomeScreen = ({ }) => {


  const [userData, setUserData] = useState<any>([]);

  // Initialize the SQLite database
  const db = SQLite.openDatabase(
    {
      name: 'usertrip.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    (error) => {
      console.error('Error opening database: ', error);
    }
  );


  // ...

  const navigation = useNavigation<NavigationProp<YourNaviatorParams>>();
  useEffect(() => {
    // Retrieve the user_id from AsyncStorage
    AsyncStorage.getItem('SET_USER_DATA')
      .then((user_id) => {
        // Fetch user data from the database based on user_id
        if (user_id) {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM table_user WHERE user_id = ?',
              [user_id],
              (tx, results) => {
                const userDataList: any[] = [];
                for (let i = 0; i < results.rows.length; i++) {
                  userDataList.push(results.rows.item(i));
                }
                setUserData(userDataList);

              },
              (error) => {
                console.error('Error fetching user data: ', error);
              }
            );
          });
        }
      })
      .catch((error) => {
        console.error('Error retrieving user_id from AsyncStorage: ', error);
      });
  }, []);

  console.log(userData)

  async function logout() {

    await AsyncStorage.removeItem('SET_USER_DATA');
    navigation.navigate('Login');
    auth().signOut();

  }




  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);




  const RowOfIcons = () => {

    return (
      <View style={styles.rowStyles}>
        <View style={styles.iconBtn}  >
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.accuweather.com/');
          }}>
            <MaterialCommunityIcons name="weather-hail" size={42} color={colors.black} />
          </TouchableOpacity>

        </View>
        <View style={styles.iconBtn}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('CreateTrip')
          }}>
            <MaterialIcons name="add" size={42} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const goToOtherPage = (id:any) => {
    navigation.navigate('TaskListing', { tripId: id });
  };


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
              <AntDesign name="logout" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'MAKE A TRIP PLAN', style: styles.heading }}
      />



      <View style={styles.subContainer}>


        {userData.map((user: any) => {
          return (
            <View key={user.id}>
              <TripCard
                name={user.name}
                place={user.place}
                startDate={user.startDate}
                endDate={user.endDate}
                onPress={() => goToOtherPage(user.id)}

              />
            </View>
          );
        })}

      </View>




      <View style={styles.bottomfixed}>
        {RowOfIcons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
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
  rowStyles: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  bottomfixed: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  iconBtn: {
    width: '50%',
    alignItems: 'center',
  },
  subContainer: {
    margin: 5
  }
});


export default HomeScreen;
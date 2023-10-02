import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Header, HeaderProps, } from '@rneui/themed';
import globalStyles from '../../globalStyles/styles';
import DatePicker from 'react-native-date-picker'
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../globalStyles/color';



interface CreateTripState {
    tripName: string;
    destination: string;
    startDate: string;
    endDate: string;
    userID: string;
}

const CreateTripScreen: React.FC = () => {
    const [createTrip, setCreateTrip] = useState<CreateTripState>({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
        userID: ''
    });
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

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS table_user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, place TEXT, start_time TEXT, end_time TEXT, user_id INTEGER, completed INTEGER)',
                [],
                () => {
                    console.log('Table created successfully');
                },
                (error) => {
                    console.error('Error creating table: ', error);
                }
            );
        });
    }, []);




    const navigation = useNavigation();


    const [error, setError] = useState<CreateTripState>({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
        userID: ''
    });

    const validate = () => {


        if (createTrip.tripName == "") {
            setError({ ...error, tripName: 'this field is required' })

        }

        else if (createTrip.destination == "") {
            setError({ ...error, destination: 'this field is required' })
        }

        else if (createTrip.startDate == "") {
            setError({ ...error, startDate: 'this field is required' })
        }

        else if (createTrip.endDate == '') {
            setError({ ...error, endDate: 'this field is required' })
        }


    };

    const onSubmit = () => {
        validate();

        if (createTrip.tripName != "" && createTrip.destination != "" && createTrip.startDate != "" && createTrip.endDate != "") {
            // Submit the form

            addTable(createTrip)
            setError({ ...error, tripName: '', destination: '', endDate: '', startDate: '' });
        }
    };

    async function addTable(createTrip: any): Promise<void> {
        try {
            // Retrieve the user_id from AsyncStorage
            const user_id = await AsyncStorage.getItem('SET_USER_DATA');

            // Start a transaction
            db.transaction((tx) => {
                // Execute the SQL INSERT statement
                tx.executeSql(
                    `
          INSERT INTO table_user(name, place, start_time, end_time, user_id, completed)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
                    [
                        createTrip.tripName,
                        createTrip.destination,
                        createTrip.startDate,
                        createTrip.endDate,
                        user_id, // Use the retrieved user_id here
                        0, // Initialize completed as 0 (incomplete)
                    ],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('Data inserted successfully');
                            navigation.navigate('Login');
                        } else {
                            console.log('Failed to insert data');
                        }
                    },
                    (error) => {
                        console.error('Error inserting data: ', error);
                    }
                );
            });


        } catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
    }





    return (
        <View>
            <Header
                containerStyle={styles.headerContainer}
                statusBarProps={{ backgroundColor: 'transparent' }}
                centerComponent={{ text: 'ADD TRIP PLAN', style: styles.heading }}
            />
            <View style={styles.screenMargin}>

                <View style={styles.smallgap}>
                    <TextInput
                        label="TripName"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, tripName: text })}
                        value={createTrip.tripName}
                        style={styles.textinputColor}
                        mode="outlined"
                    />
                </View>
                {error.tripName &&
                    <Text style={globalStyles.helpertext}>{error.tripName}</Text>}
                <View style={styles.gap}>
                    <TextInput
                        label="destination"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, destination: text })}
                        value={createTrip.destination}
                        style={styles.textinputColor}
                        mode="outlined"
                    />
                </View>
                <Text style={globalStyles.helpertext}>{error.destination}</Text>
                <View style={styles.gap} >
                    <TextInput
                        label="StartDate DD/MM/YYYY"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, startDate: text })}
                        value={createTrip.startDate}
                        style={styles.textinputColor}
                        mode="outlined"
                        keyboardType="numeric"
                    />
                </View>
                <Text style={globalStyles.helpertext}>{error.startDate}</Text>
                <View style={styles.gap}>
                    <TextInput
                        label="EndDate DD/MM/YYYY"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, endDate: text })}
                        value={createTrip.endDate}
                        style={styles.textinputColor}
                        mode="outlined"
                        keyboardType="numeric"
                    />
                </View>
                <Text style={globalStyles.helpertext}>{error.endDate}</Text>
                <View style={styles.gap}>
                    <TouchableOpacity onPress={() => onSubmit()}>
                        <View style={styles.button}>
                            <Text style={styles.textcolorsBtn}>ADD YOUR DREAM</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    disbutton: {
        backgroundColor: colors.disableColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15
    },
    gap: {
        paddingTop: 5
    },
    screenMargin: {
        padding: 15,
        margin: 10
    },
    smallgap: {
        paddingTop: 10,
        paddingBottom:20
    },

    textinputColor: {
        color: 'white'
    },
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
    textcolorsBtn: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',

    },
});


export default CreateTripScreen;



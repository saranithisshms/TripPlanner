import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import colors from '../../globalStyles/color';
import { Header, } from '@rneui/themed';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreateTaskState {
    name: string;
    location: string;
    addNotes: string;

}

const CreateTaskTripScreen: React.FC = () => {
    const [createTask, setCreateTask] = useState<CreateTaskState>({
        name: '',
        location: '',
        addNotes: '',

    });
    const route = useRoute();
    const tripId = route.params?.tripId;

     console.log('>>>>>>>>>>>',tripId)

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
                'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, tripId INTEGER, name TEXT, location TEXT, notes TEXT)',
                [],
                () => {
                    console.log('Table tasks created successfully');
                },
                (error) => {
                    console.error('Error creating tasks table: ', error);
                }
            );
        });
    }, []);


    const handleTrip = async () => {
        if (createTask.name != " " && createTask.location != '') {
            // Insert a new task record with userId and tripId
            const userId = await AsyncStorage.getItem('SET_USER_DATA');

            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO tasks (userId, tripId, name, location, notes) VALUES (?, ?, ?, ?, ?)',
                    [userId, tripId, createTask.name, createTask.location,createTask.addNotes],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            console.log('Task added successfully');
                        } else {
                            console.error('Failed to add task');
                        }
                    },
                    (error) => {
                        console.error('Error inserting task:', error);
                    }
                );
            });


        } else {

            Alert.alert('Task and Location both Field is Required ')

        }
    };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();







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
                        label="Ltinerary Name"
                        onChangeText={(text) => setCreateTask({ ...createTask, name: text })}
                        value={createTask.name}
                        style={styles.textinputColor}
                        mode="outlined"
                    />
                </View>
                <View style={styles.gap}>
                    <TextInput
                        label="Ltinerary Location"
                        onChangeText={(text) => setCreateTask({ ...createTask, location: text })}
                        value={createTask.location}
                        style={styles.textinputColor}
                        mode="outlined"

                    />
                </View>
                <View style={styles.gap}>
                    <TextInput
                        label="Add Note"
                        onChangeText={(text) => setCreateTask({ ...createTask, addNotes: text })}
                        value={createTask.addNotes}
                        style={[styles.textinputColor]}
                        mode="outlined"
                        multiline
                    />
                </View>


                <View style={styles.gap}>
                    <TouchableOpacity onPress={handleTrip}>
                        <View style={styles.button}>
                            <Text style={styles.textcolorsBtn}>Add Task</Text>
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
        paddingTop: 20
    },
    screenMargin: {
        padding: 15,
        margin: 10
    },
    smallgap: {
        paddingTop: 5
    },

    textinputColor: {
        color: colors.white
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



export default CreateTaskTripScreen;
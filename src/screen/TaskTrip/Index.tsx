import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

interface CreateTaskState {
    name: string;
    date: string;
    time: string;
    description: string;
}

const CreateTaskTripScreen: React.FC = () => {
    const [createTask, setCreateTask] = useState<CreateTaskState>({
        name: '',
        date: '',
        time: '',
        description: '',
    });

    const handleTrip = async () => {

    };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    function handlePress() {
      
    }

    return (
        <View style={styles.screenMargin}>

            <View style={styles.smallgap}>
                <TextInput
                    placeholder="TripName"
                    onChangeText={(text) => setCreateTask({ ...createTask, name: text })}
                    value={createTask.name}
                      style={styles.textinputColor}
                    mode="outlined"
                />
            </View>
            <View style={styles.gap}>
                <TextInput
                    placeholder="destination"
                    onChangeText={(text) => setCreateTask({ ...createTask, time: text })}
                    value={createTask.time}
                      style={styles.textinputColor}
                    mode="outlined"
                    
                />
            </View>
            <View style={styles.gap}>
                <TextInput
                    placeholder="StartDate"
                    onChangeText={(text) => setCreateTask({ ...createTask, date: text })}
                    value={createTask.date}
                      style={styles.textinputColor}
                    mode="outlined"
                />
            </View>
            <View style={styles.gap}>
                <TextInput
                    placeholder="EndDate"
                    onChangeText={(text) => setCreateTask({ ...createTask, description: text })}
                    value={createTask.description}
                      style={styles.textinputColor}
                    mode="outlined"
                    multiline
                />
            </View>
            <View style={styles.gap}>
                <TouchableOpacity onPress={handleTrip}>
                    <View style={styles.button}>
                        <Text style={styles.textcolorBtn}>Add Trip</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    button: {
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    gap: {
        paddingTop: 15
    },
    screenMargin: {
        padding: 15,
        margin: 10
    },
    smallgap: {
        paddingTop: 5
    },
    textinputColor:{
        backgroundColor: '#ffff'
    },
    textcolorBtn:{
        color: 'white'
      }
});


export default CreateTaskTripScreen;
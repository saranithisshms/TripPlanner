import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '@react-native-firebase/app';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Header, HeaderProps, } from '@rneui/themed';
interface CreateTripState {
    tripName: string;
    destination: string;
    startDate: string;
    endDate: string;
}

const CreateTripScreen: React.FC = () => {
    const [createTrip, setCreateTrip] = useState<CreateTripState>({
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
    });

    const handleTrip = async () => {

    };

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    function handlePress() {
        navigation.push('Register');
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
                        placeholder="TripName"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, tripName: text })}
                        value={createTrip.tripName}
                        style={styles.textinputColor}
                        mode="outlined"
                    />
                </View>
                <View style={styles.gap}>
                    <TextInput
                        placeholder="destination"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, destination: text })}
                        value={createTrip.destination}
                        style={styles.textinputColor}
                        mode="outlined"
                    />
                </View>
                <View style={styles.gap}>
                    <TextInput
                        placeholder="StartDate DD/MM/YYYY"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, startDate: text })}
                        value={createTrip.startDate}
                        style={styles.textinputColor}
                        mode="outlined"
                        keyboardType="numeric"

                    />
                </View>
                <View style={styles.gap}>
                    <TextInput
                        placeholder="EndDate DD/MM/YYYY"
                        onChangeText={(text) => setCreateTrip({ ...createTrip, endDate: text })}
                        value={createTrip.endDate}
                        style={styles.textinputColor}
                        mode="outlined"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.gap}>
                    <TouchableOpacity onPress={handleTrip}>
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
        backgroundColor: 'pink',
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
        margin: 10
    },
    smallgap: {
        paddingTop: 5
    },
  
    textinputColor: {
        color: 'white'
    },
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
    textcolorsBtn: {
        color: 'white',
        fontSize:18,
        fontWeight:'bold',
        
      },
});


export default CreateTripScreen;
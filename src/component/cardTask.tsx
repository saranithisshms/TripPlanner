import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your icon library of choice

interface TaskCardProps {
    name: string;
    onEditPress: () => void;
    onDeletePress: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ name, onEditPress, onDeletePress }) => {
    return (
        <View
            style={[
                styles.cardContainer,
                Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid,
            ]}
        >
            <View style={styles.buttonContainer}>

                <View style={{ flex:1 }}>
                    <Text style={styles.text}>{name}</Text>
                </View>
                <View style={{ flexDirection:'row'}}>
                {/* <TouchableOpacity onPress={() => onEditPress()}>
                    <Icon name="edit" size={24} color="blue" style={styles.icon} />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => onDeletePress()}>
                    <Icon name="trash" size={24} color="red" style={styles.icon} />
                </TouchableOpacity>

                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        margin: 8,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight:'bold'
    },
    shadowIOS: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    shadowAndroid: {
        elevation: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        padding: 5,
    },
});

export default TaskCard;

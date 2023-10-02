import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

interface CardWithShadowProps {
  name: string;
  place: string;
  startDate: string;
  endDate: string;
  onPress: () => void;
}

const TripCard: React.FC<CardWithShadowProps> = ({
  name,
  place,
  startDate,
  endDate,
  onPress,
}) => {
  return (

    <TouchableOpacity onPress={onPress}
      style={[
        styles.cardContainer,
        Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid,
      ]}
    >
      <Text style={styles.textname}>{name}</Text>
      <Text style={styles.text}>{place}</Text>
      {/* <Text style={styles.text}>Start Date: {startDate}</Text>
      <Text style={styles.text}>End Date: {endDate}</Text> */}
     </TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 8,
  },
  textname: {
    fontSize: 16,
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
});

export default TripCard;
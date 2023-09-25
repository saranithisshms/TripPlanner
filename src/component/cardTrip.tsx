import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, } from 'react-native-paper';
interface Trip {
  name?: string;
  startDate: Date;
  endDate: Date;
}

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <Card>
      <Text>{trip.name}</Text>
      <Text>Start date: {trip.startDate.toLocaleDateString()}</Text>
      <Text>End date: {trip.endDate.toLocaleDateString()}</Text>
    </Card>
  );
};

export default TripCard;
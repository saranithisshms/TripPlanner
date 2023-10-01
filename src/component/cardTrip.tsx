import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, } from 'react-native-paper';


const TripCard: React.FC<{ user:any }> = ({ user }) => {
  return (
    <Card>
      <Text>{user.name}</Text>
      <Text>{user.place} </Text>
    </Card>
  );
};

export default TripCard;
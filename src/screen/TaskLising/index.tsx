import React, { useState } from 'react';
import { Text,View } from 'react-native';
import TripCard from '../../component/cardTrip';



const taskListing = () => {
  const [trips, setTrips] = useState([
    { name: 'Trip 1', startDate: new Date(), endDate: new Date() },
    { name: 'Trip 2', startDate: new Date(), endDate: new Date() },
    { name: 'Trip 3', startDate: new Date(), endDate: new Date() },
  ]);

  return (
    <View>
      {trips.map((trip) => (
        <TripCard key={trip.name} trip={trip} />
      ))}
    </View>
  );
};

export default taskListing;
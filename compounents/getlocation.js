import React, { useState, useEffect } from 'react';
import { StyleSheet, View , Text} from 'react-native';
import * as Location from 'expo-location';

const Getlocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({
          latitude: 0,
          longitude: 0,
        });
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        </View>
      ) : (
        <View>
          <Text>No location found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  locationText: {
    color: 'white',
    fontSize: 25,
  },
});

export default Getlocation;
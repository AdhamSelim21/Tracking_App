import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const ButtonTrack = () => {
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return; // Handle permission denial
      }

      // Start tracking location (replace with your specific logic)
      console.log('Tracking started');
      setIsTracking(true);

      // ... your tracking implementation here ...

    } catch (error) {
      console.error(error);
    }
  };

  const stopTracking = () => {
    // Stop tracking (replace with your specific logic)
    console.log('Tracking stopped');
    setIsTracking(false);

    // ... your tracking stopping logic here ...
  };

  const styles = StyleSheet.create({
    button: {
      width: 150,
      height: 150,
      padding: 10,
      borderRadius: 100,
      marginTop: 55,
      
    },
    buttonStart: {
      backgroundColor: 'green',
    },
    buttonStop: {
      backgroundColor: 'red',
    },
    buttonText: {
      color: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 30,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, isTracking ? styles.buttonStop : styles.buttonStart]}
      onPress={isTracking ? stopTracking : startTracking}
    >
      <Text style={styles.buttonText}>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</Text>
    </TouchableOpacity>
  );
};

export default ButtonTrack;
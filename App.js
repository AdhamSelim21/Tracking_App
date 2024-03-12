import React , { useState }from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import ButtonTrack from './compounents/trackbutton';
import PushNotification from './compounents/pushnotification';  
import Getlocation from './compounents/getlocation';


const App = () => {
  const [isTracking, setIsTracking] = useState(false);

  const handleToggleTracking = () => {
    setIsTracking(!isTracking);
    // Add your button press logic here
  };
  
  return (
    <View style={styles.container}>
   <ButtonTrack onPress={handleToggleTracking}  isTracking={isTracking} />
   <PushNotification/>
   <Getlocation/>
    </View>
    
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
});

export default App;

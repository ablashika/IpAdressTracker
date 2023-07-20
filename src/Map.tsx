import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,TextInput ,Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import axios from "axios"


const initialMapRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
export default function Map() {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [mapRegion, setMapRegion] = useState(initialMapRegion);
  const handleSearch = () => {
    fetchGeo();
  };


  const fetchGeo = async (): Promise<void> => {
    try {
      let response = await fetch('https://ipapi.co/' + ipAddress + '/json/');
      let jsonData = await response.json();
  
      console.log(jsonData);
        
      // Extract the required data
      const { city, country, latitude, longitude } = jsonData;
      setLatitude(parseFloat(latitude));
      setLongitude(parseFloat(longitude));
      console.log(longitude)
       setCity(city)
       setCountry(country)
      console.log(city, country);

    } catch (error) {
      console.log('Error:', error);
    }
  };
useEffect(() => {
    // Set the map region whenever latitude or longitude changes
    setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [latitude, longitude]);


  return (
    <View>
      <Text>Map</Text>

     <TextInput
          value={ipAddress}
          onChangeText={setIpAddress}
        placeholder="Enter IP Address"
        accessibilityLabel="address-input"
      
      />
      <Button title="Search" onPress={handleSearch} /> 
      <View>
      <Text>IP Address: {ipAddress}</Text>
        <Text>Location: {city},{country}</Text>
      </View>
      {/* {latitude !== 0 && longitude !== 0 && ( */}
        <MapView
          style={styles.map}
          region={mapRegion} 
          onRegionChange={setMapRegion} 
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>

        
      {/* )} */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
      height:600
    },
  });
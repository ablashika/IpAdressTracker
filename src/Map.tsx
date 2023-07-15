import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,TextInput ,Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import axios from "axios"

export default function Map() {
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  




  const handleSearch = () => {
    // Perform the search using the location entered by the user
      fetchGeo();
  };
  
  // useEffect(() => {
  //   fetchGeo();
  // }, []);

  const fetchGeo = async (): Promise<void> => {

    try {
      let apiKey = "at_i77OJ6Nt3n0ipZoEvfonck5RcC5h8"
      let ipAdress = "154.160.21.49"
      let response = await axios.get(`https://geo.ipify.org/api/v2/country,city? apiKey=${apiKey}&ip=${ipAdress}`)
      console.log(response,"jj")
      const { lat, lng } = response.data.location;
      console.log(lat,lng)
      console.log(response.data)
      setLatitude(lat);
      setLongitude(lng);
     

      
        } catch (error) {
            console.log('Error:', error);
          }
    }
  return (
    <View>
      <Text>Map</Text>

     <TextInput
        // style={styles.input}
        placeholder="Enter a location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Search" onPress={handleSearch} /> 
      {latitude !== 0 && longitude !== 0 && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      )}
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







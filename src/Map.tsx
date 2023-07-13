import { View, Text,StyleSheet  } from 'react-native'
import React,{useState, useEffect} from 'react'
import MapView, { Marker } from 'react-native-maps';
import axios from "axios"

export default function Map() {
    const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    fetchGeo();
  }, []);

    const fetchGeo =  async ()=>{

        try {
        let apiKey = "at_i77OJ6Nt3n0ipZoEvfonck5RcC5h8"
        let ipAdress = "154.160.21.49"
        let response = await axios.get(`https://geo.ipify.org/api/v2/country? apiKey=${apiKey}&ip=${ipAdress}`)
        console.log(response)
     
        const { latitude, longitude } = response.data;
        console.log(latitude)
          setLatitude(latitude);
          setLongitude(longitude);
        } catch (error) {
            console.log('Error:', error);
          }
    }
  return (
    <View>
      <Text>Map</Text>
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
    },
  });
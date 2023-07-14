import { View, Text,StyleSheet,TextInput ,Button } from 'react-native'
import React,{useState, useEffect} from 'react'
import MapView, { Marker } from 'react-native-maps';
import axios from "axios"

export default function Map() {
    const [latitude, setLatitude] = useState(5.57692);
  const [longitude, setLongitude] = useState(-0.31038);
  
  useEffect(() => {
    fetchGeo();
  }, []);

    const fetchGeo =  async ()=>{

        try {
        let apiKey = "at_i77OJ6Nt3n0ipZoEvfonck5RcC5h8"
        let ipAdress = "154.160.21.49"
        let response = await axios.get(`https://geo.ipify.org/api/v2/country,city? apiKey=${apiKey}&ip=${ipAdress}`)
        console.log(response)
     
        const latitude = response.data.location.lat;
        const longitude = response.data.location.lng;
        console.log(latitude, longitude)
          setLatitude(latitude);
          setLongitude(longitude);
        } catch (error) {
            console.log('Error:', error);
          }
    }
  return (
    <View>
      <Text>Map</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Enter a location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Search" onPress={handleSearch} /> */}
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







// import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import axios from 'axios';

// export default function Map() {
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [location, setLocation] = useState('');

//   const handleSearch = () => {
//     // Perform the search using the location entered by the user
//     fetchGeo(location);
//   };

//   const fetchGeo = async (location) => {
//     try {
//       let apiKey = 'at_i77OJ6Nt3n0ipZoEvfonck5RcC5h8';
//       let response = await axios.get(
//         `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ip=${location}`
//       );
//       const { lat, lng } = response.data.location;
//       setLatitude(lat);
//       setLongitude(lng);
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Map</Text>

//       <TextInput
//         // style={styles.input}
//         placeholder="Enter a location"
//         value={location}
//         onChangeText={setLocation}
//       />
//       <Button title="Search" onPress={handleSearch} />
//       {latitude !== 0 && longitude !== 0 && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude,
//             longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker coordinate={{ latitude, longitude }} />
//         </MapView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//     height: 600,
//   },
// });

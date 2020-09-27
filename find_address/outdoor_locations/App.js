import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import MapView, { Marker} from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [locationlat, setLocationlat] = useState(60.166640739);
  const [locationlng, setLocationlng] = useState(24.943536799);
  const [outdoor, setOutdoor] = useState([]);

  useEffect(() => {getOutdoorLocations();}, []);

  const getOutdoorLocations = async () => {
    let outdoor_list = [];
    const url = 'https://citynature.eu/api/wp/v2/places?cityid=5';
    try {
    const response = await fetch(url); 
    const data = await response.json();
    console.log(data.length);
    for (let i = 0; i < data.length; i++){
      
      outdoor_list.push({"title": data[i].title,
      "lat": data[i].routes.features[0].geometry.coordinates[0][1],
      "lng":data[i].routes.features[0].geometry.coordinates[0][0],
    });
    }
    setOutdoor(outdoor_list);
    console.log("TULOKSET");
    console.log(data[0].title);
    console.log(data[0].routes.features[0].geometry.coordinates[0][1]);
    console.log(outdoor);


    } catch(error){
      Alert.alert('Error', error); 
      };
  }
  
  const getLocation = async () => {
    
    const url = 'https://www.mapquestapi.com/geocoding/v1/address?key=HPktEGttUajZcYURGNIzFrm3Zljpm8uh&inFormat=kvp&outFormat=json&location='+ address +'%2C+Helsinki+Finland&thumbMaps=false';

    try {
    const response = await fetch(url); 
    const data = await response.json();
    setLocationlat(data.results[0].locations[0].displayLatLng.lat);
    setLocationlng(data.results[0].locations[0].displayLatLng.lng);

    } catch(error){
      Alert.alert('Error', error); 
      };
  }
  


  return (
    <View style={{ flex: 1 }}>
   
    <MapView 
    style={{ flex:8 }}
    region={{latitude: locationlat, longitude:locationlng, latitudeDelta: 0.005,longitudeDelta:0.004,}}>
    <Marker
    coordinate={{latitude:locationlat, longitude: locationlng}}/>
    
    </MapView>
    <View style={{ flex: 1, alignItems: 'center', paddingTop:5,}}>
     <TextInput
     style={{fontSize: 18, width:200, padding: 5, height: 40, borderColor: 'gray', borderWidth: 1 }} 
     value={address}
     placeholder="Address"
     onChangeText={(address) => setAddress(address)}/>
     </View>
     <View style={styles.button}>
     <Button type="outline" title="Find" onPress={getLocation} />
     </View>
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

  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 1,
    textAlign:'center',

  },
 
});


import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import MapView, { Marker} from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [locationlat, setLocationlat] = useState(60.166640739);
  const [locationlng, setLocationlng] = useState(24.943536799);
  const [outdoor, setOutdoor] = useState([]);

  //useEffect(() => {setOutdoor([]);getOutdoorLocations();}, []);

  const getOutdoorLocations = async () => {
    let outdoor_list = [];
    const url = 'https://citynature.eu/api/wp/v2/places?cityid=5';
    try {
    const response = await fetch(url); 
    const data = await response.json();
    console.log(data.length);
    
  
    for (let i = 0; i < data.length; i++){
      
      outdoor_list.push( {title: data[i].title,
        lat: data[i].routes.features[0].geometry.coordinates[0][1],
        lng:data[i].routes.features[0].geometry.coordinates[0][0]
      });
      
    }
    setOutdoor(outdoor_list);


    } catch(error){
      Alert.alert('Error', error); 
      };
  }
  
  const getinfo = () => {
    console.log("Outdoor info")
    console.log(outdoor);
  }

  const clearlocations = () => {
    setOutdoor([]);
  }
  
 
  
  console.log("uusi data");
  console.log(outdoor);
  return (
    <View style={{ flex: 1 }}>
   
    <MapView 
    style={{ flex:8 }}
    region={{latitude: locationlat, longitude:locationlng, latitudeDelta: 0.005,longitudeDelta:0.004,}}>
    <Marker
    coordinate={{latitude:locationlat, longitude: locationlng}}/>
    {outdoor.map((marker) =>  
    <Marker
      key={marker.index}
      coordinate={{latitude:marker.lat, longitude: marker.lng}}
      title={marker.title}
    />
  )}
    </MapView>
    
     <View style={styles.button}>
     <Button type="outline" title="Places" onPress={getOutdoorLocations} />
     <Button type="outline" title="Info" onPress={getinfo} />
     <Button type="outline" title="Clear" onPress={clearlocations} />
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


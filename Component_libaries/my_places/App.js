import React, { useState} from 'react';
import { View, FlatList } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import{ Input, Button, ListItem, Icon } from'react-native-elements';
import MapView, { Marker} from 'react-native-maps';


// Main screen
function MyPlacesScreen({navigation}) {
  const [address, setAddress] = useState('');
  const[data, setData] = useState([]);

// Save address
  const saveItem = () => {
    if (address){
      
      setData(data)
      setData([...data, {key: String(data.length),address: address}]);
      setAddress('');
    }
  }

  //Render List
  const renderItem = ({item,index}) => (
    
    <ListItem
      key={index}
      title={item.address.address}
      onPress={() =>  navigation.navigate('Map', {user: item.address.address})}
      onLongPress={() => deleteItem(item.key)}
      rightSubtitle = "show on map"
      bottomDivider
      chevron
      />
      );
  
  // Delete address
  const deleteItem = (key) => {
    const newList = data.filter((item) => item.key !== key);
    console.log("New"+newList)
    setData(newList)
      }
      console.log(data)
  return (
    <View>

    <Input placeholder = 'Type address' label="PLACE FINDER"
    onChangeText={(address) => setAddress({address})}
    value={address}
    />
    <Button icon={
    <Icon
    name='save'
    color='white' />
  } onPress={saveItem} title="Save" /> 
      <FlatList
        data = {data}
        renderItem={renderItem}/>
          
    </View>
  );
}

//Map Screen
function MapScreen({route}) {
  const {user} = route.params;
  const address = user 
  const [locationlat, setLocationlat] = useState(60.166640739);
  const [locationlng, setLocationlng] = useState(24.943536799);

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
  
  return(
    <View style={{ flex: 1 }}>
   
    <MapView 
    style={{ flex:12 }}
    region={{latitude: locationlat, longitude:locationlng, latitudeDelta: 0.005,longitudeDelta:0.004,}}>
    <Marker
    coordinate={{latitude:locationlat, longitude: locationlng}}/>
    </MapView>
    <View style={{ flex: 1, alignItems: 'center', paddingTop:5,}}>
     </View>
     
     <Button title="Find" onPress={getLocation} />
     
   </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={MyPlacesScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




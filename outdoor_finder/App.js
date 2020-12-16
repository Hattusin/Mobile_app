import React, { useState, useEffect, useRef} from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker, Polygon} from 'react-native-maps';
import * as Location from 'expo-location';

import {getPreciseDistance} from 'geolib';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H3 } from 'native-base';

import RBSheet from "react-native-raw-bottom-sheet";

export default function App() {
  const [userinfo, setUserinfo] = useState('Helsingin keskusta');
  const [location, setLocation] = useState(null);
  const [userPlacelat, setUserplacelat] = useState(60.166640739);
  const [userPlacelng, setUserplacelng] = useState(24.943536799);
  const [locationlat, setLocationlat] = useState(60.166640739);
  const [locationlng, setLocationlng] = useState(24.943536799);
  const [outdoor, setOutdoor] = useState([]);
  const [coordinates, setCoodinates]= useState([]);
  const [placename, setPlacename] = useState('Ei valittuna');
  const [distance, setDistance] = useState('Ei tiedossa');
  const [button_on, setButton] = useState(true);
  const refRBSheet = useRef();

  useEffect(() => {
    getUserLocation();
    getOutdoorLocations();
  }, []);

  const getUserLocation = async()   => {
    //Check permission
    let  {status} = await Location.requestPermissionsAsync();
    if (status!== 'granted') {
      Alert.alert('No permission to access location');
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationlat(location.coords.latitude);
      setLocationlng(location.coords.longitude);
      setUserplacelat(location.coords.latitude);
      setUserplacelng(location.coords.longitude);
      console.log(location);
      setUserinfo('Olet tässä');
    }
  };
  //Get outdoorlocation data
  const getOutdoorLocations = async () => {
    let outdoor_list = [];
    
    const url = 'https://citynature.eu/api/wp/v2/places?cityid=5';
    try {
    const response = await fetch(url); 
    const data = await response.json();
    console.log(data.length);
  
    for (let i = 0; i < data.length; i++){

      if (data[i].routes !== null){
        let coordinate_list = [];
        //For polygon we need to re-form the coordinates data
        for (let k = 0; k < data[i].routes.features[0].geometry.coordinates.length; k++){
          coordinate_list.push({latitude: data[i].routes.features[0].geometry.coordinates[k][1],
            longitude: data[i].routes.features[0].geometry.coordinates[k][0]
          })
        }
        
      
      outdoor_list.push( {title: data[i].title,
        lat: data[i].routes.features[0].geometry.coordinates[0][1],
        lng:data[i].routes.features[0].geometry.coordinates[0][0],
        coords: coordinate_list
      });
    }
      
    }
    setOutdoor(outdoor_list);

  } catch (error) {
    Alert.alert('Error', error.message);
    };
  }

  //Get the closest place viewed from the user
  const getNearestPlace = () => {
    
    let neares_place = '';
    let dist_2 = 100;
    let lat;
    let lng;
    for (let i=0; i < outdoor.length; i++){
      var pdis = getPreciseDistance(
        {latitude: outdoor[i].lat, longitude: outdoor[i].lng},
        {latitude: userPlacelat, longitude: userPlacelng},
      );
      let dist = pdis / 1000;
      console.log(dist);
      if (dist < dist_2){
        neares_place = outdoor[i].title;
        dist_2 = dist;
        lat = outdoor[i].lat;
        lng = outdoor[i].lng;
      }
    }
    if(neares_place !== null){
      setLocationlat(lat);
      setLocationlng(lng);
      markerClick(lat, lng, neares_place);
      alert(
        `Lähin ulkoilureitti on ${neares_place}, mikä sijaitsee ${dist_2} KM päässä.`
      );
    }

  }

  //After clicking marker updated information
  const markerClick = (lat, lng, title) => {

    var pdis = getPreciseDistance(
      {latitude: lat, longitude: lng},
      {latitude: userPlacelat, longitude: userPlacelng},
    );
      setPlacename(title);
      let dist = pdis / 1000 + " KM";
      setDistance(dist);
      setButton(false);
      setLocationlat(lat);
      setLocationlng(lng);
  }

  //Info button about the application
  const showInfo = () => {
    alert(
      'Tässä applikaatiossa näytetään Helsingin yleisimpiä ulkoilureittejä. Sallimalla sijaintisi jaon löydät lähimmän napin painalluksella sekä reitin pituuden paikan päälle linnuntietä.'
    )
    console.log(outdoor[0].coords);
  }
 
  return (
    <Container>
        <Header hasSegment style={{backgroundColor:'#9be37f'}} >
        <Left/>
          <Body >
            <Title>HELSINGIN</Title>
            <Title>ULKOILUPAIKAT</Title>
          </Body>
          <Right style={{padding:5}}>
            <Button success transparent onPress={showInfo}>
              <Icon name='paw' />
            </Button>
          </Right>
        </Header>
        
          
          <View style={{ flex: 4 }}>
            <MapView 
              style={{ flex:8 }}
              region={{latitude: locationlat, longitude:locationlng, latitudeDelta: 0.005,longitudeDelta:0.004,}}>
            <Marker
              title={userinfo}
              coordinate={{latitude:userPlacelat, longitude: userPlacelng}}/>
            {outdoor.map((marker,index) =>  
              <Marker
                key={index}
                coordinate={{latitude:marker.lat, longitude: marker.lng}}
                title={marker.title}
                pinColor={'green'}
                onPress={() => markerClick(marker.lat, marker.lng, marker.title)}
              />
            )}
            {outdoor.map((data,index) =>  
              <Polygon
                key={index}
                coordinates={data.coords}
                fillColor="#52b82a"
                lineCap="square"
              />
            )}
            </MapView>
          </View>
        <Footer>
          <FooterTab>
            <Button block info disabled={button_on} onPress={() => refRBSheet.current.open()} ><Text style={{color:'white', textAlign:'center'}}>Ulkoilu Paikan Tiedot</Text></Button>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: "transparent"
                },
                draggableIcon: {
                  backgroundColor: "#000"
                }
              }}
            >
              <Content padder contentContainerStyle={{padding:'10%', justifyContent:'center', backgroundColor:'#9be37f', flex:2}}>
                <H3>Paikan nimi: {placename}</H3>
                <H3>Etäisyys: {distance}</H3>
              </Content>
            </RBSheet>
            <Button block success onPress={getNearestPlace}>
              <Text style={{color:'white', textAlign:'center'}}>Näytä Lähin Ulkoilupaikka</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
   
  );
}




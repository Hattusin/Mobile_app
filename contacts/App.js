import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const[contact, setContact]= useState({});

  const getContacts = async() => {
    const { status} = await Contacts.requestPermissionsAsync();
    if (status ===  'granted'){
      const { data } = await Contacts.getContactsAsync({
        fields:[Contacts.Fields.PhoneNumbers],
      });
        setContact(data);
      }
    }
    
  return (
    <View style={styles.container}>

      <Text>Contacts</Text>
          <FlatList data = {contact} renderItem={({item})=>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text> }
          />
      <View style = {styles.button}>
            <Button onPress={getContacts} title="GET CONTACTS" />
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
    padding:20,
  },
  button: {
    backgroundColor: 'skyblue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 1,
    textAlign:'center',  
  
  }
});

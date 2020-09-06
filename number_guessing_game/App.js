
import React, { useState } from 'react';
import { StyleSheet, Text, Button, TextInput, View, Alert } from 'react-native';

var rand_number = Math.floor(Math .random() * 100) + 1
var counter = 0;

export default function App() {
  const [number, setNumber] = useState('');
  const [text,result] = useState('Guess a number between 1-100')
  
  const buttonGuess = () => {  
    counter = counter +1;
    if(!number){
      result('Guess a number between 1-100')
    }else if (rand_number < number){
      result('Your guess '+ number +' is too high')
    }else if (rand_number > number) {
      result('Your guess '+ number +' is too low')
    }
    else {
      Alert.alert('You guessed the number in '+ counter +' guesses')
      rand_number = Math.floor(Math .random() * 100) + 1
      counter = 0;  
      result('Guess a number between 1-1000')
    }
    setNumber('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.middle}>

      <Text>{text}</Text>
      <TextInput style={{width: 100, borderColor: 'gray', borderWidth: 1}} onChangeText={number => setNumber(number)} value={number}
        placeholder="Enter Number"
        keyboardType={'numeric'}
        />
      <View style = {styles.button}>
      <Button onPress={buttonGuess} color="black" title="Make Guess" />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "space-around",
      backgroundColor: "#fff",
      padding: 20,
      margin: 10,
      alignItems: 'center',
    },
    middle: {
      flex:0.3,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      borderWidth: 1,
      padding: 20,
      borderColor: 'black',
      backgroundColor: 'skyblue',
      borderRadius:20,  

   }

});

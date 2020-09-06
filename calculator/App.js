import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, TextInput } from 'react-native';



export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, plus] = useState('');
  const buttonPlus = () => {
    plus(Number(number1)+Number(number2))
    setNumber1('');
    setNumber2('');
  }
  const buttonMinus = () => {
    plus(Number(number1)-Number(number2))
    setNumber1('');
      setNumber2('');
  }
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <Text>Result: {result}</Text>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}} onChangeText={number1 => setNumber1(number1)} value={number1}
        placeholder="Enter Numeric Values Only"
        keyboardType={'numeric'}
        />
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}} onChangeText={number2 => setNumber2(number2)} value={number2}
          placeholder="Enter Numeric Values Only"
          keyboardType={'numeric'}
        />
        
        <View style={{ flex:0.55, flexDirection: 'row', justifyContent: 'space-between',}}>
          <View style = {styles.button}>
            <Button onPress={buttonPlus} title="+" />
          </View>
          <View style = {styles.button}>
            <Button onPress={buttonMinus} title="-" />
          </View>
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
    justifyContent: "space-around",
    alignItems: 'center',
  },
  button: {
    flex:0.3,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderColor: 'black',
    backgroundColor: 'skyblue',
    borderRadius:20,  
    

 }
});

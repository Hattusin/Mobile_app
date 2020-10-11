import React, { useState} from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');
  const speak = async () => {
    Speech.speak(text);
    setText('');
  }

  
    return (
      <View style={styles.container}>
        <TextInput 
        style={{
          width: 200,
          height: 50, 
          borderColor: 'gray', 
          borderWidth: 1}} 
          onChangeText={text => setText(text)} value={text}/>
      <View style={styles.button}>
        <Button title="Press to hear text" onPress={speak} />
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
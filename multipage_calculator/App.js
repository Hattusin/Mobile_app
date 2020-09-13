
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
//import { Ionicons} from '@expo/vector-icons'; 

function CalculatorScreen({navigation}) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, plus] = useState('');
  const[data, setData] = useState([]);
  const buttonPlus = () => {
    if (number1 && number2){
      var value1 = (Number(number1)+Number(number2));
      plus(value1);
      var text = number1 +' + ' + number2 + ' = ' + value1;
      setData([...data, {key:text}]);
      setNumber1('');
      setNumber2('');
    }
  }
  const buttonMinus = () => {
    if (number1 && number2){
      var value = (Number(number1)-Number(number2));
      plus(value);
      var text = number1 +' - ' + number2 + ' = '+ value;
      setData([...data, {key:text}]);
      setNumber1('');
      setNumber2('');
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
      <Text>Result: {result}</Text>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}} onChangeText={number1 => setNumber1(number1)} value={number1}
        keyboardType={'numeric'}
        />
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}} onChangeText={number2 => setNumber2(number2)} value={number2} 
          keyboardType={'numeric'}
        />
        <View style={{ flex:0.11, flexDirection: 'row', justifyContent: 'space-between',}}>
          <View style = {styles.button}>
            <Button onPress={buttonPlus} title="+" />
          </View>
          <View style = {styles.button}>
            <Button onPress={buttonMinus} title="-" />
          </View>
          <View style = {styles.button}>
        <Button
        title="History"
        onPress={() =>  navigation.navigate('History', {user: data})}
      />
      </View>
        </View>
        
    </View>
      
    </View>
  );
}

function HistoryScreen({route}) {
  const {user} = route.params;
  return(
    <View style={styles.container}>
      <View>
          <Text>History</Text>
          <FlatList data = {user} renderItem={({item})=>
          <Text>{item .key}</Text>}
          />
        
        </View>
      </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex:1,
    justifyContent: 'center',
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

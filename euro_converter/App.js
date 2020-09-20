import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { StyleSheet, Text, View,Picker, TextInput, Button, Keyboard } from 'react-native';



export default function App() {
  const [input_value, setRatesValue] = useState('');
  const [result, setResult] = useState('');
  const [selectedValue, setSelectedValue] = useState("");
  const[rates_list, setRate] = useState([]);
  const [data, setJSON] = useState('');
  const[explanation, setExplanation]= React.useState('');
  const[url, setUrl] = React.useState('');
  const[isReady,setReady]= React.useState(false);

  

  const getRates = () => {
    const rates_selected = data.rates[selectedValue]
    
    setResult(Number(input_value)*Number(rates_selected) + ' €');
    //setResult(rates_selected);
  }
  
  
  React.useEffect(()=> {
    fetch('http://data.fixer.io/api/latest?access_key=3351759e072d061cddda105b27a6fd6e')
    .then(response=> response.json())
    .then(responseData=> {setJSON(responseData);
      setUrl(responseData.url);
      setReady(true);
      setRate(Object.keys(responseData.rates));
    })
      .catch(err => console.error(err))},
  [])
 
  
  return (
    
    <View style={styles.container}>
      
      
      <Text>{result}</Text>
      
      <View style={styles.middle}>
      <TextInput
      style={{fontSize: 18, width:200  }} 
      value={input_value}
      placeholder="Value"
      keyboardType={'numeric'}
      onChangeText={(input_value) => setRatesValue(input_value)}/>
      <View style = {styles.button}>
      <Button title="Convert" onPress={getRates} />
      </View>
        </View>
      
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 50 }}
        onValueChange={selectedValue => setSelectedValue(selectedValue)}>
        {rates_list.map((item, index) => {
        return (<Picker.Item label={item} value={item} key={index}/>) 
    })}
        </Picker>
       
      
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
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  button: {
    flex:0.7,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderColor: 'black',
    backgroundColor: 'skyblue',
    borderRadius:20,  
 }
 
});

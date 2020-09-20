import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Button, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState('');

  const getRecipes = async () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + ingredient;

    try {
    const response = await fetch(url); 
    const data = await response.json();
    setRecipes(data.results);
    } catch(error){
      Alert.alert('Error', error); 
      };
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
      style={{margin: "5%", }}
      keyExtractor={item =>  item.title }
      renderItem={({item})   =>  
      <View>
      <Text>{item.title}</Text> 
      <Image style={styles.tinyLogo} source={{uri: item.thumbnail}}/>
      </View>
    }
      
      ItemSeparatorComponent={listSeparator}
      data={recipes}/>
      
      <TextInput
      style={{fontSize: 18, width:200  }} 
      value={ingredient}
      placeholder="Ingredient"
      onChangeText={(ingredient) => setIngredient(ingredient)}/>
      <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

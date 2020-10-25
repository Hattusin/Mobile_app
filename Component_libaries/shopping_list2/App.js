import React, { useState, useEffect } from 'react';
import{ Header, Input, Button, ListItem } from'react-native-elements';
import { View, FlatList, } from 'react-native';



export default function App() {
  const [name, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const[data, setData] = useState([]);
  
  const saveItem = () => {
    if (name){
      
      setData(data)
      setData([...data, {key: String(data.length),product: name, amount: amount}]);
      
      setProduct('');
      setAmount('');
    }
  }
  const list = [
    {product:"maitoa",
      amount:3
    },
    {product:"maitoa",
      amount:4
    },{product:"maitoa",
    amount:5
    }
  ];
  console.log(list);
  console.log(data)
  const renderItem = ({item,index}) => (
    
    <ListItem
      key={index}
      title={item.product.product}
      subtitle={item.amount.amount}
      onPress={() => deleteItem(item.key)}
      rightSubtitle = "bought"
      bottomDivider
      chevron
      />
      );

      const deleteItem = (key) => {
        const newList = data.filter((item) => item.key !== key);
        console.log("New"+newList)
        setData(newList)
      }
  return (
    <View>
    <Header
    leftComponent={{ icon:'menu', color: '# fff  ' }}
    centerComponent={{ text:'SHOPPINGLIST', style:{ color: '#fff  ' } }}
    rightComponent={{ icon:'home', color: '# fff' }}
    />
    <Input placeholder = 'Product' label="PRODUCT"
    onChangeText={(product) => setProduct({product})}
    value={name}
    />
    <Input placeholder = 'Amount' label="AMOUNT"
    onChangeText={(amount) => setAmount({amount})}
    value={amount}
    />
    <Button onPress={saveItem} title="Save" /> 
      <FlatList
        data = {data}
        renderItem={renderItem}/>
          
    </View>
  );
}



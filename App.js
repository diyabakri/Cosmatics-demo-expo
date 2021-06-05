import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Form from './screens/add_product';
import Catalog from './screens/Catalog';
import Product from './screens/Product_page';
import HUB from './screens/Hub';
import Add_user from './screens/add_client';
import Clients_list from './screens/Clients_List'
import Order from './screens/Order';
import Order_List from './screens/Order_list';
import Restock from './screens/Restock_Products';
const Stack = createStackNavigator();

export default function App() {
  console.disableYellowBox = true
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Home" component = {Home}/>
          <Stack.Screen name = "Catalog" component = {Catalog}/>
          <Stack.Screen name = "Form" component = {Form}/>
          <Stack.Screen name = "Product" component = {Product}/>
          <Stack.Screen name = "Hub" component = {HUB}/>
          <Stack.Screen name = "add_Client" component = {Add_user}/>
          <Stack.Screen name = "Clients_list" component = {Clients_list}/>
          <Stack.Screen name = "Order" component = {Order}/>
          <Stack.Screen name = "Order_List" component = {Order_List}/>
          <Stack.Screen name = "Restock" component = {Restock}/>


        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width : '100%',
    height:'100%',
    backgroundColor: '#fff',
    alignContent:'center'
    
  },
});

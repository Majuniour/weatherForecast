
import React from 'react';

import { Button, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Maps from './src/screens/Favourite'
import List from './src/screens/List'
import ListDatails from './src/screens/ListDetails'


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} 
        options={
          { 
            title: 'WEATHER APP',
            headerStyle: {
            backgroundColor: '#007fba',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          }} />
        <Stack.Screen name="Details" component={Details}  options={
          { 
            title: '',
            headerStyle: {
            backgroundColor: '#007fba',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} />
          <Stack.Screen name="Maps" component={Maps}  options={
          { 
            title: 'PLACES',
            headerStyle: {
            backgroundColor: '#007fba',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} />
            <Stack.Screen name="List" component={List}  options={
          { 
            title: 'MY SAVED LIST',
            headerStyle: {
            backgroundColor: '#007fba',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} />
          <Stack.Screen name="ListDatails" component={ListDatails}  options={
          { 
            title: 'List Details',
            headerStyle: {
            backgroundColor: '#007fba',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
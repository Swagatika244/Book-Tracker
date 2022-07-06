import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Books from '../screens/Book';
import History from '../screens/History';
import List from '../screens/List';
import Info from '../screens/Info'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default class BottomTabNavigation extends Component {
  render() {
    return (
        <NavigationContainer>
          <Tab.Navigator screenOptions = {{headerShown : false}}>
                      <Tab.Screen name="History" component={History} />

            <Tab.Screen name="Books" component={Books} />
            <Tab.Screen name = "To-Read" component={List}/>

          </Tab.Navigator>
          
          
        </NavigationContainer>
    )
  }
}
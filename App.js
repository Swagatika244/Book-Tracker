import React, { Component } from 'react';
import { Text } from 'react-native';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import BottomTabNavigation from './components/BottomTabNavigation';
import Info from './screens/Info';
import History from './screens/History'

import { createSwitchNavigator, createAppContainer } from "react-navigation";

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator(
  {
    BottomTab: {
      screen: BottomTabNavigation
    },
  },
  {
    initialRouteName: "BottomTab"
  }
)
const AppContainer = createAppContainer(AppSwitchNavigator);
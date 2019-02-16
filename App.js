/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, PermissionsAndroid, AsyncStorage} from 'react-native'
import OneSignal from 'react-native-onesignal'
import { createStackNavigator, createAppContainer } from "react-navigation"
import DetailsScreen from './components/DetailsScreen'
import MainScreen from './components/MainScreen'

const AppNavigator = createStackNavigator(
  { 
    Home: {
      screen: MainScreen,
      path: 'people/:name',
    },
    Details: {
      screen: DetailsScreen
    }
  }, 
  {
    initilaRouteName: 'Home',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class Container extends Component {

  render() {
    return (
      <AppContainer />
    )
  }
}
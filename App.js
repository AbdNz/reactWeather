/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, PermissionsAndroid, AsyncStorage} from 'react-native';
import OneSignal from 'react-native-onesignal'
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailsScreen from './components/DetailsScreen';
import MainScreen from './components/MainScreen'

export async function requestRuntimePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App want to access your location",
        buttonNeutral: "Ask me later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission granted");
    } else {
      console.log("Location permission denied");
    }
  } catch(err) {
    console.warn(err);
  }
}

const AppNavigator = createStackNavigator(
  { 
    Home: {
      screen: MainScreen,

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      path: 'people/:name',
      // The action and route params are extracted from the path
      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        // title: `${navigation.state.params.name}'s Profile'`,
      }),
    },
    Details: {
      screen: DetailsScreen
    }
  }, 
  {
    initilaRouteName: 'Home',
    // headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class SplashScreen extends Component {

  constructor(props) {
    super(props)
    OneSignal.init("b15d255f-df2e-49e0-824b-ceeb8bd8666b");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  async componentDidMount() {

    if (Platform.OS === 'android') {
      await requestRuntimePermission();
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <AppContainer />
    )
  }
}
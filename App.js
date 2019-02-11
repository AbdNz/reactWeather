/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Image} from 'react-native';
import ForecastCard from './components/ForecastCard'
import DetailsCard from './components/DetailsCard'
import {getForecastData, ForecastType} from './utility/Util'

export async function requestRuntimePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "App want to access your location"
      }
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Location permission granted");
    } else {
      Alert.alert("Location permission denied");
    }
  } catch(err) {
    console.warn(err);
    
  }
}


export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = { latitude: 0, longitude: 0, error: null }
    this.state = { weatherData: null }
    this.state = { temp: 0, description: null, city: null}
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await requestRuntimePermission();
    }

    this.getLongLat = navigator.geolocation.watchPosition(
      (position) => {
        if ((this.state.latitude !== position.coords.latitude) && (this.state.longitude !== position.coords.longitude)) {
          getForecastData(ForecastType.current, position.coords.latitude, position.coords.longitude)
          .then(data => this.setStateData(data))
          
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          })
        }
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 100, distanceFilter: 10}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.getLongLat);
  }

  setStateData(data) {

    if (data == undefined) {
      return;
    }

    this.setState({
      temp: parseInt(data.main.temp),
      description: data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1),
      city: data.name,

      weatherData: data

    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      <Text style={{textAlign: 'center', fontWeight:'bold', fontSize: 24}}>{this.state.city}</Text>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 84, }}>{this.state.temp}</Text>
            <Text style={{fontSize: 32, top: 12}}>°C</Text>
          </View>
          <Text style={{fontSize: 20, top: -8}}>{this.state.description}</Text>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginEnd: 16}}>
          <Text>More Details</Text>
          <Image style={{width: 16, height: 16}} source={require('./icons/chevron.png')} />
        </View>

        <ForecastCard latitude={this.state.latitude} longitude={this.state.longitude}/>
        <DetailsCard detailsData={this.state.weatherData}/>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      padding: 8,
      margin: 8,
    }
})
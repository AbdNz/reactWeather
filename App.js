/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import ForecastCard from './components/ForecastCard'
import DetailsCard from './components/DetailsCard'
import {getForecastData, ForecastType} from './utility/Util'
import AnimatedView from './components/AnimatedView'

export async function requestRuntimePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Location Permission",
        message: "App want to access your location"
      }
    )

    if (granted != PermissionsAndroid.RESULTS.GRANTED) {
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
    this.state = { weatherData: null, isActivityIndicatorVisible: true }
    this.state = { temp: 0, description: null, city: null}
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await requestRuntimePermission();
    }

    this.getLongLat = navigator.geolocation.watchPosition( (position) => {
      console.log(position.coords);
        if ((this.state.latitude !== position.coords.latitude) && (this.state.longitude !== position.coords.longitude)) {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          })

          getForecastData(ForecastType.current, position.coords.latitude, position.coords.longitude)
          .then(data => this.setStateData(data))
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
    this.setState({
      temp: parseInt(data.main.temp),
      description: data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1),
      city: data.name,
      weatherData: data,
      isActivityIndicatorVisible: false
    })
  }

  onPressMoreButton() {
    console.log("More Button pressed!!!");
  }

  render() {

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
        <AnimatedView>
        <Text style={styles.cityName}>{this.state.city}</Text>
        <ScrollView>
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.tempMain}>{this.state.temp}</Text>
              <Text style={{fontSize: 32, top: 12, color: 'black'}}>°C</Text>
            </View>
            <Text style={styles.descMain}>{this.state.description}</Text>
            <TouchableOpacity onPress={this.onPressMoreButton}>
              <View style={styles.moreContainer}>
                <Text style={styles.moreText}>More Details</Text>
                <Image style={{width: 18, height: 18, alignItems: 'center'}} source={require('./icons/chevron.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <ForecastCard latitude={this.state.latitude} longitude={this.state.longitude}/>
          <DetailsCard detailsData={this.state.weatherData}/>
        </ScrollView>
        </AnimatedView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    marginBottom: 0
  },
  cityName: {
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 24,
    color: 'black'
  },
  tempMain: {
    fontSize: 84,
    color: 'black',
  },
  descMain: {
    color: 'black',
    fontSize: 20,
    top: -8
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 8,
  },
  moreText: {
    color: 'black',
    fontSize: 14,
    justifyContent: 'center'
  }
})
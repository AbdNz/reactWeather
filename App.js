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
    this.state = { modalVisible: false }
    this.state = { temp: 0, tempMax: 0, tempMin: 0, pressure: 0, humidity: 0, description: null, icon: null, visibility: 0, windSpeed: 0, windDegree: 0, sunrise: null, sunset: null}
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      await requestRuntimePermission();
    }

    this.getLongLat = navigator.geolocation.watchPosition(
      (position) => {
        if ((this.state.latitude !== position.coords.latitude) && (this.state.longitude !== position.coords.longitude)) {
          // this.getWeatherFromApiAsync(position);

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

  async getWeatherFromApiAsync(position) {

    var apiKey = "52a3a122fb5328e9cbbed672e53f4be5";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var city = "Delhi";
    var reqUrlLatLon = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID="+apiKey;
    var reqUrlCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;

    return fetch(reqUrlLatLon)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setStateData(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  setStateData(data) {

    var d = new Date(data.sys.sunrise*1000);
    console.log("Hours: "+d.getHours());
    console.log("Minutes: "+d.getMinutes());
    console.log("Seconds: "+d.getSeconds());
        
    this.setState({
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      visibility: data.visibility,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
      <Text style={{textAlign: 'center', fontWeight:'bold', fontSize: 24}}>Mumbai</Text>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 84, }}>23</Text>
            <Text style={{fontSize: 32, top: 12}}>°C</Text>
          </View>
          <Text style={{fontSize: 20, top: -8}}>Clear</Text>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginEnd: 16}}>
          <Text>More Details</Text>
          <Image style={{width: 16, height: 16}} source={require('./icons/chevron.png')} />
        </View>

        <ForecastCard />
        <DetailsCard />

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
      // borderWidth: 0.5
    }
})
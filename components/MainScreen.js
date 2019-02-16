import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, AsyncStorage, Image, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { getForecastData, ForecastType, } from '../utility/Util'
import OneSignal from 'react-native-onesignal'
import ForecastCard from './ForecastCard'
import DetailsCard from './DetailsCard'
import AnimatedView from './AnimatedView'

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

export default class MainScreen extends Component{

    constructor(props) {
      super(props);
  
      this.state = { latitude: 0, longitude: 0, error: null }
      this.state = { currentData: null, forecastData5: null, forecastData16: null }
      this.state = { temp: 0, description: null, city: null}
  
      OneSignal.init("b15d255f-df2e-49e0-824b-ceeb8bd8666b");
      OneSignal.enableVibrate(true);
      OneSignal.inFocusDisplaying(1);
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }
  
    async componentDidMount() {

      if (Platform.OS == 'android') {
        await requestRuntimePermission()
      }
  
      var currentData = await AsyncStorage.getItem(ForecastType.current)
      this.setStateData(JSON.parse(currentData), ForecastType.current, false)
      var forecastData16 = await AsyncStorage.getItem(ForecastType.forecast16)
      this.setStateData(JSON.parse(forecastData16), ForecastType.forecast16, false)
      var forecastData5 = await AsyncStorage.getItem(ForecastType.forecast5)
      this.setStateData(JSON.parse(forecastData5), ForecastType.forecast5, false)
  
      this.getLongLat = navigator.geolocation.watchPosition( (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
  
          if ((this.state.latitude !== lat) && (this.state.longitude !== lon)) {
            this.setState({
              latitude: lat,
              longitude: lon,
              error: null
            })
  
            getForecastData(ForecastType.current, lat, lon)
              .then(data => this.setStateData(data, ForecastType.current, true))
  
            getForecastData(ForecastType.forecast16, lat, lon)
              .then(data => this.setStateData(data, ForecastType.forecast16, true))
          }
        },
        (error) => this.setState({error: error.message}),
        {enableHighAccuracy: false, timeout: 10000, maximumAge: 5000, distanceFilter: 10}
      );
  
    }
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.getLongLat);
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
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
  
    setStateData(data, forecastType, isFromApi) {
  
      if(data != null) {
        if(isFromApi) {
          AsyncStorage.setItem(forecastType, JSON.stringify(data))
        }
      } else {
        return
      }
  
      if (forecastType == ForecastType.current) {
        this.setState({
          temp: parseInt(data.main.temp),
          description: data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1),
          city: data.name,
          currentData: data,
          isActivityIndicatorVisible: false
        })
      } else if (forecastType == ForecastType.forecast5) {
        this.setState({ forecastData5: data })
      } else if (forecastType == ForecastType.forecast16) {
        this.setState({ forecastData16: data })
      }
      
    }
  
    onPressMoreButton() {
      console.log("More Button pressed!!!");
      this.props.navigation.navigate("Details");
    }
  
    render() {
  
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'lightblue'}}>
          <AnimatedView>
          <Text style={styles.cityName}>{this.state.city}</Text>
          <ScrollView style={{marginBottom: 32}}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.tempMain}>{this.state.temp}</Text>
                <Text style={{fontSize: 32, top: 12, color: 'black'}}>°C</Text>
              </View>
              <Text style={styles.descMain}>{this.state.description}</Text>
              <TouchableOpacity onPress={() => {this.onPressMoreButton()}}>
                <View style={styles.moreContainer}>
                  <Text style={styles.moreText}>More Details</Text>
                  <Image style={{width: 18, height: 18, alignItems: 'center'}} source={require('../icons/chevron.png')} />
                </View>
              </TouchableOpacity>
            </View>
            <ForecastCard forecastData={this.state.forecastData16}/>
            <DetailsCard detailsData={this.state.currentData}/>
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
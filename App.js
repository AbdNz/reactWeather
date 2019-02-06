/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import styles from "./Styles";
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Modal, TouchableHighlight, Image} from 'react-native';
// import { StackNavigator } from "react-navigation";

// class MainActivity extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       TextInputName: "",
//       TextInputNumber: ""
//     }
//   }

//   static navigationOptions = {
//     title: "MainActivity"
//   };

//   sundDataFunction = () => {
//     this.props.navigation.navigate("Second", {
//       NameObj: this.state.TextInputName,
//       NumberObj: this.state.TextInputNumber
//     })
//   }

//   render() {
//     return (
//       <SafeAreaView style={{flex: 1}}>
//         <View style={style.container}>
//           <TextInput
//             placeholder="Enter Name here"
//             onChangeText={data => this.setState({ TextInputName: data })}
//             style={styles.textInputStyle}
//             underlineColorAndroid='transparent'
//           />
  
//           <TextInput
//             placeholder="Enter Mobile Number here"
//             onChangeText={data => this.setState({ TextInputNumber: data })}
//             style={styles.textInputStyle}
//             keyboardType={'numeric'}
//             underlineColorAndroid='transparent'
//           />
  
//           <TouchableOpacity onPress={this.Send_Data_Function} activeOpacity={0.7} style={styles.button} >
  
//             <Text style={styles.buttonText}> Send TextInput Value To Next Activity </Text>
  
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     )
//   }
// }


// class SecondActivity extends Component {
//   static navigationOptions = {
//     title: "SecondActivity"
//   };

//   render() {
//     return(
//       <SafeAreaView style={{flex: 1}}>
//         <View style={styles.container}>
//           <Text>{this.props.navigation.state.params.NameObj}</Text>
//           <Text>{this.props.navigation.state.params.NumberObj}</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }
// }


// export default Project = StackNavigator(
//   {
//     First: { screen: MainActivity},
//     Second: { screen: SecondActivity}
//   }
// )


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
          this.requestWeatheData(position);
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

  async requestWeatheData(position) {
    var apiKey = "52a3a122fb5328e9cbbed672e53f4be5";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var city = "Delhi";
    var receivedData = "";
    var reqUrlLongLat = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID="+apiKey;
    var reqUrlCity = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        receivedData = JSON.parse(request.responseText);
        this.setStateData(receivedData);
        console.log("Latitude: "+receivedData.coord.lat+"\nLongitude: "+receivedData.coord.lon);
      } else {
        console.warn("error");
      }
    }
    request.open('GET', reqUrlLongLat);
    request.send();
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
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, alignContent: 'center'}}>
            <Image style={{width: 75, height: 75}} source={{uri: "http://openweathermap.org/img/w/"+this.state.icon+".png", cache: "force-cache"}} />
            <View style={{flex: 1, flexDirection: "column", marginStart: 16}}>
              <Text style={{fontSize: 32}}>{this.state.temp}°C</Text>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
                <Text style={{flex: 1, textAlign: 'left'}}>{this.state.tempMin}°C</Text>
                <Text style={{flex: 1, textAlign: 'right'}}>{this.state.tempMax}°C</Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>Visibility</Text>
              <Text>Pressure</Text>
              <Text>Humidity</Text>
              <Text>Wind</Text>
              <Text>Sunrise</Text>
              <Text>Sunset</Text>
            </View>
            <View style={{flex: 3}}>
              <Text>{this.state.visibility} mtrs</Text>
              <Text>{this.state.pressure} hPa</Text>
              <Text>{this.state.humidity} %</Text>
              <Text>{this.state.windSpeed} kmps  {this.state.windDegree}°</Text>
              <Text>{Math.round(this.state.sunrise)}</Text>
              <Text>{this.state.sunset}</Text>
            </View>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}




{/* <Modal
animationType="slide"
transparent={false}
visible={this.state.modalVisible}
// presentationStyle="fullScreen"
onRequestClose={() => {
  Alert.alert('Modal has been closed.');
}}>
  <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
        <Text>Hide Modal</Text>
      </TouchableHighlight>
    </View>
  </SafeAreaView>
</Modal>

<TouchableHighlight onPress={() => { this.setModalVisible(true) }}>
  <Text>Show Modal</Text>
</TouchableHighlight> */}
          
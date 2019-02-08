import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Image} from 'react-native';
import PropTypes from 'prop-types';
import Divider from './Divider';


export default class ForecastCard extends Component {

    render() {
        return(
            <View style={styles.cardContainer}>
                <View style={{flexDirection:'row', alignItems: "center"}}>
                    <Text style={styles.cardText}>Today - Clear</Text>
                    <View style={{justifyContent:'flex-end', alignItems: 'center', flex:1, flexDirection:'row'}}>
                        <Image style={{width: 30, height: 30, marginEnd: 8}} source={{uri: "http://openweathermap.org/img/w/50d.png", cache: "force-cache"}} />
                        <Text style={styles.cardText}>26 / 16°C</Text>
                    </View>
                </View>
                <Divider />
                <View style={{flexDirection:'row', alignItems: "center"}}>
                    <Text style={styles.cardText}>Tomorrow - Clear</Text>
                    <View style={{justifyContent:'flex-end', alignItems: 'center', flex:1, flexDirection:'row'}}>
                        <Image style={{width: 30, height: 30, marginEnd: 8}} source={{uri: "http://openweathermap.org/img/w/50d.png", cache: "force-cache"}} />
                        <Text style={styles.cardText}>26 / 16°C</Text>
                    </View>
                </View>
                <Divider />
                <View style={{flexDirection:'row', alignItems: "center"}}>
                    <Text style={styles.cardText}>Sat - Clear</Text>
                    <View style={{justifyContent:'flex-end', alignItems: 'center', flex:1, flexDirection:'row'}}>
                        <Image style={{width: 30, height: 30, marginEnd: 8}} source={{uri: "http://openweathermap.org/img/w/50d.png", cache: "force-cache"}} />
                        <Text style={styles.cardText}>26 / 16°C</Text>
                    </View>
                </View>
                <Divider divMarginStart={-16} divMarginEnd={-16} />
                <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.cardText}>5-Day forecast</Text>
                </View>
                
            </View>
        )
    }
}

ForecastCard.propTypes = {
    forecastData: PropTypes.object
}


const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        margin: 8,
        padding: 16,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    cardText: {
        fontSize: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        
    }
}) 
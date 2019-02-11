import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import Divider from './Divider';
import {getForecastData, ForecastType, getTime} from '../utility/Util'

export default class ForecastCard extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null, isDataAvailable: false}
    }

    render() {

        const latitude = this.props.latitude;
        const longitude = this.props.longitude;

        if (latitude != undefined && longitude != undefined && !this.state.isDataAvailable) {
            getForecastData(ForecastType.forecast16, latitude, longitude)
              .then(data => this.setState({data: data, isDataAvailable: true}))
              .catch((error) => {
                  this.setState({isDataAvailable: true})
                  console.error(error);
              });
        }

        function setData(data) {
            console.log(data);
            var count = data.cnt
            var listItem = [];

            for (i=0; i<count; i++) {
                listItem.push(<ForecastRow />)
                if(i!=count-1) {
                    listItem.push(<Divider />)
                }
            }
            return listItem;
        }

        var Details = () => {
            return(
                this.state.data != null ? setData(this.state.data):null
            )
        }

        const ForecastRow = (props) => {
            return(
                <View style={{flexDirection:'row', alignItems: "center"}}>
                    <Text style={styles.cardText}>{props.day}</Text>
                    <View style={{justifyContent:'flex-end', alignItems: 'center', flex:1, flexDirection:'row'}}>
                        <Image style={{width: 30, height: 30, marginEnd: 8}} source={{uri: "http://openweathermap.org/img/w/50d.png", cache: "force-cache"}} />
                        <Text style={styles.cardText}>26 / 16°C</Text>
                    </View>
                </View>
            )
        }

        return(
            <View style={styles.cardContainer}>
                {/* <ForecastRow day={"Today · "}/>
                <Divider />
                <ForecastRow day={"Tomorrow · "}/>
                <Divider />
                <ForecastRow day={"Wed · "}/> */}
                <Details />
                <Divider divMarginStart={-16} divMarginEnd={-16} />
                <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.cardText}>5-Day forecast</Text>
                </View>
                
            </View>
        )
    }
}

ForecastCard.propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number
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
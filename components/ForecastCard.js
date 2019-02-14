import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Divider from './Divider';
import AnimatedView from './AnimatedView';
import {getForecastData, ForecastType, getDescription} from '../utility/Util'

export default class ForecastCard extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null, isDataAvailable: false, isCardExpanded: false}
    }

    expandCard = () => {
        this.setState({isCardExpanded: !this.state.isCardExpanded})
    }

    render() {

        var data = this.props.forecastData

        function setData(data, isExpanded) {
            var count = isExpanded ? data.cnt : 3
            var listItem = [];

            for (i=0; i<count; i++) {
                dt = data.list[i].dt
                max = Math.round(data.list[i].temp.max)
                min = Math.round(data.list[i].temp.min)
                icon = data.list[i].weather[0].icon
                description = getDescription(dt, data.list[i].weather[0].description)
                listItem.push(<ForecastRow key={dt} max={max} min={min} icon={icon} description={description}/>)
                if(i!=count-1) {
                    listItem.push(<Divider key={dt+1}/>)
                }
            }
            return listItem;
        }

        var Details = () => {
            return(
                data != null ? setData(data, this.state.isCardExpanded):null
            )
        }

        const ForecastRow = (props) => {
            return(
                <View style={{flexDirection:'row', alignItems: "center"}}>
                    <View>
                        <Text style={styles.cardText}>{props.description}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Image style={{width: 30, height: 30}} source={{uri: "http://openweathermap.org/img/w/"+props.icon+".png", cache: "force-cache"}} />
                        <Text style={[styles.cardText, { textAlign: 'right'}]}>{props.max} / {props.min}°C</Text>
                    </View>
                </View>
            )
        }

        return(
            <AnimatedView style={styles.cardContainer}>
                <Details />
                <Divider divMarginStart={-16} divMarginEnd={-16} />
                <TouchableOpacity onPress={event => this.expandCard()}>
                    <View style={styles.forecastButtonContainer}>
                        <Text style={[styles.cardText, {fontWeight: 'bold'}]}>7-Day forecast</Text>
                    </View>
                </TouchableOpacity>
            </AnimatedView>
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
        color: 'black',
        fontSize: 16, 
        alignItems: 'center',
        justifyContent: 'center',
        
    }, 
    rowContainer: {
        justifyContent:'flex-end',
        alignItems: 'center',
        flex:1,
        flexDirection:'row'
    },
    forecastButtonContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
}) 
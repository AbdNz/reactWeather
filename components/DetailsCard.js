import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import Divider from './Divider';
import AnimatedView from './AnimatedView';
import { getDirection } from '../utility/Util';

export default class DetailsCard extends Component {

    render() {
        var data = this.props.detailsData;

        return(
            data == undefined ? null :
            <AnimatedView style={styles.cardContainer}>
                <View style={{flexDirection:'row', margin: 12}}>
                    <Text style={[styles.cardText, {fontWeight: 'bold'}]}>Details</Text>
                </View>
                <Divider divSetMargin={false}/>
                <View style={{flexDirection: 'row', }}>
                    <View style={[styles.detailsContainer, {borderEndWidth: 1}]}>
                        <View>
                            <Text style={styles.detailsRowHeader}>{getDirection(data.wind.deg)}</Text>
                            <Text style={styles.detailsRowContent}>{data.wind.speed}km/h</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/wind.png')} />
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View>
                            <Text style={styles.detailsRowHeader}>Real feel</Text>
                            <Text style={styles.detailsRowContent}>{data.main.temp}°C</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/temp.png')} />
                        </View>
                    </View>
                </View>
                <Divider divSetMargin={false} />
                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.detailsContainer,{borderEndWidth: 1}]}>
                        <View>
                            <Text style={styles.detailsRowHeader}>Humidity</Text>
                            <Text style={styles.detailsRowContent}>{data.main.humidity}%</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/humidity.png')} />
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View>
                            <Text style={styles.detailsRowHeader}>Pressure</Text>
                            <Text style={styles.detailsRowContent}>{data.main.pressure}hPa</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/pressure.png')} />
                        </View>
                    </View>
                </View>
            </AnimatedView>
        )
    }
}

DetailsCard.propTypes = {
    detailsData: PropTypes.object
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        margin: 8,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    cardText: {
        color: 'black',
        fontSize: 20, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        justifyContent:'flex-end',
        alignItems: 'center',
        flex:1,
        flexDirection:'row'
    },
    detailsImage: {
        width: 40,
        height: 40,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 8
    },
    detailsRowHeader: {
        color: 'black',
        fontWeight: 'bold'
    },
    detailsRowContent : {
        color: 'black',
        fontSize: 18
    }
}) 
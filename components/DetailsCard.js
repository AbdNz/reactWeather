import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Image} from 'react-native';
import Divider from './Divider'

export default class DetailsCard extends Component {
    render() {
        return(
            <View style={styles.cardContainer}>
                <View style={{flexDirection:'row', margin: 12}}>
                    <Text style={[styles.cardText, {fontWeight: 'bold'}]}>Details</Text>
                </View>
                <Divider divSetMargin={false}/>
                <View style={{flexDirection: 'row', }}>
                    <View style={[styles.detailsContainer, {borderEndWidth: 1}]}>
                        <View>
                            <Text>Wind</Text>
                            <Text style={{fontSize: 18}}>14.3km/h</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/wind.png')} />
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View>
                            <Text>Real feel</Text>
                            <Text style={{fontSize: 18}}>23.9°C</Text>
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
                            <Text>Humidity</Text>
                            <Text style={{fontSize: 18}}>50%</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/humidity.png')} />
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View>
                            <Text>Pressure</Text>
                            <Text style={{fontSize: 18}}>1017.0hPa</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.detailsImage} source={require('../icons/pressure.png')} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        margin: 8,
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
    },
    cardText: {
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
    }
}) 
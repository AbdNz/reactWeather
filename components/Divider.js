import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Alert, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class Divider extends Component {
    render() {
        return(
            <View style={styles(this.props).viewStyle}></View>
        )
    }
}

Divider.propTypes = {
    divBorderWidth: PropTypes.number,
    divMarginStart: PropTypes.number,
    divMarginEnd: PropTypes.number,
    divMarginTop: PropTypes.number,
    divMarginBottom: PropTypes.number,
    divColor: PropTypes.string,
    divSetMargin: PropTypes.bool
};

Divider.defaultProps = {
    divBorderWidth: 0.5,
    divMarginStart: 0,
    divMarginEnd: 0,
    divMarginTop: 16,
    divMarginBottom: 16,
    divColor: "black",
    divSetMargin: true,
};

const styles = (props) => StyleSheet.create({
    viewStyle: { 
        borderWidth: props.divBorderWidth,
        marginStart: props.divSetMargin ? props.divMarginStart : 0,
        marginEnd: props.divSetMargin ? props.divMarginEnd : 0,
        marginTop: props.divSetMargin ? props.divMarginTop: 0,
        marginBottom: props.divSetMargin ? props.divMarginBottom: 0,
        borderColor: props.divColor,
        
    }
})
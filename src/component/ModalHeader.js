import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// create a component
const ModalHeader = ({ onCrossPress, onTickPress, heading }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity onPress={onCrossPress}>
                        <Image
                            source={require('../assets/Images/close.png')}
                            style={styles.closeIcon}
                            resizeMode='center'
                        />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>{heading}</Text>
                </View>
                <TouchableOpacity onPress={onTickPress}>
                    <Image
                        source={require('../assets/Images/tick.png')}
                        style={styles.tickIcon}
                        resizeMode='center'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4da2ff",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 20,
        alignItems: "center",
    },
    leftHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    closeIcon: {
        height: 20,
        width: 20,
        tintColor: 'white',
    },
    headingText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 30,
    },
    tickIcon: {
        height: 20,
        width: 20,
        tintColor: 'white',
    },
});

// make this component available to the app
export default ModalHeader;

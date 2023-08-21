import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import TopSearch from './TopSearch';
import AddButton from './AddButton';

// create a component
const Header = ({ onPress, onChangeText, value }) => {

    return (
        <View style={styles.container}>
            <View style={{margin:20}}>
                <View style={styles.headerContent}>
                    <Text style={styles.titleText}>My ToDo List</Text>
                    <AddButton onPress={onPress} />
                </View>
                <TopSearch onChangeText={onChangeText} value={value} />
            </View>
        </View>
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4da2ff",
        borderBottomEndRadius: 100,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

// make this component available to the app
export default Header;

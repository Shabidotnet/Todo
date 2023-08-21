//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';

// create a component
const TopSearch = ({ onChangeText, value }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchbar}>
                <TextInput placeholder='Search by keywords...'
                    onChangeText={onChangeText}
                    value={value}
                    style={{ flex: 1 }} />
            </View>
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        width: '90%'
    },
    searchbar: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginHorizontal: 10
    }
});

//make this component available to the app
export default TopSearch;

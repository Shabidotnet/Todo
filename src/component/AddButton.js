import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';

// create a component
const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.addButton}>
            <Image
                source={require('../assets/Images/plus.png')}
                style={styles.addButtonImage}
                resizeMode='center'
            />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    addButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 5,
    },
    addButtonImage: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        tintColor: '#4da2ff',
    },
});

// make this component available to the app
export default AddButton;

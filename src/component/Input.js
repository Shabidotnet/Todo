import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
    const {
        title,
        placeholder,
        onChangeText,
        multiline,
        value,
        inputStyle = {},
    } = props

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <TextInput
                style={[styles.inputView, inputStyle]}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    titleStyle: {
        color: 'grey',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10
    },
    inputView: {
        backgroundColor: '#eee',
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 10
    }
});

export default Input;

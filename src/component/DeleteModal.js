import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from 'react-native';

const DeleteModal = ({ onPress, visible, onRequestClose, onCrossPress }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onCrossPress} style={styles.closeButton}>
                        <Image
                            source={require('../assets/Images/close.png')}
                            style={styles.closeIcon}
                            resizeMode='center'
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/Images/warning.png')}
                        style={styles.warningIcon}
                        resizeMode='cover'
                    />
                    <View style={styles.content}>
                        <Text style={styles.modalText}>Do you want to delete?</Text>
                        <TouchableOpacity
                            style={styles.yesButton}
                            onPress={onPress}
                        >
                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00004444",
        // position:'absolute',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 250,
        height: 150,
      
    },
    closeButton: {
        backgroundColor: "#4da2ff",
        borderRadius: 50,
        alignSelf: 'center',
        position: 'absolute',
        top: 10,
        right: 20,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: "center",
    },
    closeIcon: {
        width: 15,
        height: 115,
        alignItems: 'center',
        justifyContent: 'center',
        tintColor: 'white',
    },
    warningIcon: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 110,
        top: 20,
    },
    content: {
        marginTop: 70,
    },
    yesButton: {
        borderRadius: 10,
        backgroundColor: '#4da2ff',
        padding: 5,
        marginHorizontal: 80,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default DeleteModal;

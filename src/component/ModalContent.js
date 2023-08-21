// ModalContent.js
import React from 'react';
import { View, StyleSheet, Modal, Pressable, Text } from 'react-native';
import ModalHeader from '../component/ModalHeader';
import Input from '../component/Input';

const ModalContent = ({ visible, onTickPress, onCrossPress, setTitle, setDescription }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCrossPress}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ModalHeader
                        heading={"Add To Do"}
                        onTickPress={onTickPress}
                        onCrossPress={onCrossPress} />
                    <Input
                        title={'Title'}
                        placeholder={"Enter title"}
                        onChangeText={setTitle}
                    />
                    <Input
                        inputStyle={{ textAlignVertical: "top", minHeight: 200 }}
                        title={'Description'}
                        placeholder={"Enter description"}
                        multiline={true}
                        onChangeText={setDescription}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "white"
    },
    modalView: {
        backgroundColor: 'white',
    },
});

export default ModalContent;

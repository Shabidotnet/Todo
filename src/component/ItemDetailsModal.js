import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import ModalHeader from '../component/ModalHeader';
import Input from '../component/Input';

const ItemDetailsModal = ({
    visible,
    selectedItem,
    onCrossPress,
    onUpdate
}) => {
    if (!selectedItem) {
        return null;
    }

    const [title, setTitleState] = useState(selectedItem?.title || '');
    const [description, setDescriptionState] = useState(selectedItem?.description || '');

    const handleTitleChange = (text) => {
        setTitleState(text);
    };

    const handleDescriptionChange = (text) => {
        setDescriptionState(text);
    };

    const handleSave = () => {

        const updatedData = {
            title,
            description,
            date: new Date(),
        };
        onUpdate(selectedItem.userId, updatedData);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCrossPress}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ModalHeader heading={"To Do"} onTickPress={handleSave} onCrossPress={onCrossPress} />
                    <Input
                        title={'Title'}
                        placeholder={"Enter title"}
                        onChangeText={handleTitleChange}
                        value={title}
                    />
                    <Input
                        inputStyle={{ textAlignVertical: "top", minHeight: 200, }}
                        title={'Description'}
                        placeholder={"Enter description"}
                        multiline={true}
                        onChangeText={handleDescriptionChange}
                        value={description}
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
    container: {
        margin: 20
    },
});

export default ItemDetailsModal;

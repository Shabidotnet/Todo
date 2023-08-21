//import liraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalContent from '../component/ModalContent';
import ItemDetailsModal from '../component/ItemDetailsModal';
import DeleteModal from '../component/DeleteModal';
import moment from 'moment';

// create a component
const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [savedData, setSavedData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [delModal, setdelModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        fetchSavedData();
    }, [fetchSavedData]);

    const saveDataToStorage = async () => {
        try {
            const currentDate = new Date();
            const id = moment().valueOf()
            const dataToSave = { title, description, date: currentDate, userId: id };
            const existingData = await AsyncStorage.getItem('savedData');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            const updatedData = [...parsedData, dataToSave];
            await AsyncStorage.setItem('savedData', JSON.stringify(updatedData));
            setSavedData(updatedData);
            setModalVisible(false);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const fetchSavedData = useCallback(async () => {
        try {
            const existingData = await AsyncStorage.getItem('savedData');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            const sortedData = parsedData.sort((a, b) => new Date(b.date) - new Date(a.date));
            setSavedData(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);
    const handleDeleteItem = async (index) => {
        try {

            if (delModal) {
                const updatedData = savedData.filter((item, i) => i !== index);
                await AsyncStorage.setItem('savedData', JSON.stringify(updatedData));
                setSavedData(updatedData);
            }

            setdelModal(false);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    const updateSavedData = async (userId, title, description, date) => {
        try {
            const existingData = await AsyncStorage.getItem('savedData');
            const parsedData = existingData ? JSON.parse(existingData) : [];
            const updatedList = parsedData.map((item) => {
                if (item.userId === userId) {
                    return {
                        ...item,
                        title,
                        description,
                        date,
                    };
                } else {
                    return item;
                }
            });
            await AsyncStorage.setItem('savedData', JSON.stringify(updatedList));
            setSavedData(updatedList);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleUpdateItem = (userId, updatedData) => {
        updateSavedData(userId, updatedData.title, updatedData.description, updatedData.date);
        setSelectedItem(null);
    };
    const handleItemPress = (item) => {
        setSelectedItem(item);
    };
    const filterData = (data, keyword) => {
        if (keyword === '') {
            return data;
        }

        const filteredData = data.filter(
            (item) =>
                item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                item.description.toLowerCase().includes(keyword.toLowerCase())
        );
        return filteredData;
    };

    const onDelete = (index) => {
        setdelModal(true);
        setDeleteIndex(index);
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemRow}>
                <View style={styles.itemContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.itemContent}
                        onPress={() => handleItemPress(item)}>
                        <View style={styles.itemTitleRow}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.itemDescriptionRow}>
                            <Text style={styles.itemDescription}>
                                {item?.description?.length > 20 ? `${item?.description?.substring(0, 70)}...` : item?.description}
                            </Text>
                        </View>
                        <View style={styles.itemDateRow}>
                            <Text style={styles.itemDate}>{new Date(item.date).toLocaleString()}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemActionContainer}>
                        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemActionButton}>
                            <Image style={styles.itemActionIcon} source={require('../assets/Images/edit.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemActionButton} onPress={() => onDelete(index)}>
                            <Image style={styles.itemActionIcon} source={require('../assets/Images/trash.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Header onChangeText={(text) => setSearchKeyword(text)}
                value={searchKeyword}
                onPress={() => setModalVisible(true)} />

            <ModalContent
                visible={modalVisible}
                onTickPress={() => saveDataToStorage()}
                onCrossPress={() => setModalVisible(false)}
                setTitle={setTitle}
                setDescription={setDescription}
            />
            <DeleteModal
                visible={delModal}
                onRequestClose={() => setdelModal(false)}
                onPress={() => handleDeleteItem(deleteIndex)}
                onCrossPress={() => setdelModal(false)}
            />
            {selectedItem && (
                <ItemDetailsModal
                    visible={true}
                    selectedItem={selectedItem}
                    onCrossPress={() => setSelectedItem(null)}
                    onUpdate={(userId, updatedData) => handleUpdateItem(userId, updatedData)}
                />
            )}
            <FlatList
                style={{ flex: 1, backgroundColor: 'white' }}
                data={filterData(savedData, searchKeyword)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
             
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemContainer: {
        borderRadius: 10,
        backgroundColor: "#eee",
        marginHorizontal: 20,
        padding: 10,
        marginTop: 20,
        elevation: 10,
        flexDirection: "row",
    },
    itemContent: {
        flex: 1,
    },
    itemTitleRow: {
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: "space-between",
    },
    itemTitle: {
        color: 'grey',
        fontWeight: 'bold',
    },
    itemDescriptionRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemDescription: {
        color: 'grey',
    },
    itemDateRow: {
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    itemDate: {
        color: "grey",
        fontSize: 12,
    },
    itemActionContainer: {
        flex: 0.2,
        justifyContent: 'space-between',
        alignItems: "center",
    },
    itemActionButton: {
        flex: 1,
        justifyContent: 'center',
    },
    itemActionIcon: {
        height: 20,
        width: 20,
        tintColor: 'grey',
    },
    flatList: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

//make this component available to the app
export default Home;

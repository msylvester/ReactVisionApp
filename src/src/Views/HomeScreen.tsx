import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const user = useSelector((state) => state.user.user);
    const { uid, projects } = user;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonPress = (projectName) => {
        navigation.navigate('ProjectScreen', { uid, projectName });
    };
    const addButton = () => {
        return (
            <Button
                title="Add New Project"
                onPress={() => setModalVisible(true)}
            />
        );

    }
    const renderProjectButton = () => {
        if (projects.length === 0) {
            addButton();
        } else {
            return (
                <View>
                    <FlatList
                        data={projects}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleButtonPress(item)}
                            >
                                <Text style={styles.buttonText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                        numColumns={2}
                    />
                    <Button
                        title="Add New Project"
                        onPress={() => setModalVisible(true)}
                    />
                </View>

            );
        }
    };

    return (
        <View style={styles.container}>
            {renderProjectButton()}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Add New Project Modal</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 150,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default HomeScreen;


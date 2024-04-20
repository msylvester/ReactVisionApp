import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Animated, Easing } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { setUser, updateProjects } from '../store';
import DeleteModal from '../Components/DeleteModal';
import ProjectButtons from '../Components/ProjectButtons';

const HomeScreen = () => {
    const user = useSelector((state) => state.user.user);
    const { uid, projects, email, permissionCamera } = user;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [selected, setSelected] = useState(null);
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [buttonVibrations, setButtonVibrations] = useState(Array(projects.length).fill(false));

    const handleButtonPress = (index, projectName) => {
        if (isDeleteActive) {
            const newButtonVibrations = [...buttonVibrations];
            newButtonVibrations[index] = !newButtonVibrations[index];
            setButtonVibrations(newButtonVibrations);
        } else {
            setSelected(prevSelected => prevSelected === projectName ? null : projectName);
        }
    };

    const handleDelete = () => {
        setIsDeleteActive(prev => !prev); // Toggle delete button state
    };

    const confirmDelete = async () => {
        // Update Firestore with the new project name
        await updateUser(uid, user, selected, 'delete')
        const updatedProjects = projects.filter(item => item !== selected);
        await dispatch(setUser({
            uid,
            permissionCamera,
            email,
            projects: updatedProjects,
        }))
        setDeleteModalVisible(false);
        setIsDeleteActive(false); // Reset delete button state
        setButtonVibrations(Array(projects.length).fill(false)); // Reset button vibrations
    }

    const createNewProject = async () => {
        if (newProjectName.trim() !== '') {
            try {
                // Update Firestore with the new project name
                await updateUser(uid, user, newProjectName, 'project')
                const updatedProjects = [...projects, newProjectName.trim()];
                await dispatch(setUser({
                    uid,
                    permissionCamera,
                    email,
                    projects: updatedProjects,
                }))
                setModalVisible(false);
                setNewProjectName('');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.projectButtonsContainer}>
                <ProjectButtons
                    selected={selected}
                    projects={projects}
                    buttonVibrations={buttonVibrations}
                    handleButtonPress={handleButtonPress}
                    deleteSelect={isDeleteActive} // Pass deleteSelect as isDeleteActive
                />
                <DeleteModal
                    confirmDelete={confirmDelete}
                    deleteModalVisible={deleteModalVisible}
                    setDeleteModalVisible={setDeleteModalVisible}
                />
            </View>
            <View style={styles.bottomButtonsContainer}>
                <Button
                    title="New Project"
                    onPress={() => setModalVisible(true)}
                    color="#ff0000" // Red button color
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    color={isDeleteActive ? "#ff0000" : "#999999"} // Change color based on delete button state
                />
                <Button
                    title="Go To project"
                    onPress={() => navigation.navigate('ProjectScreen', { uid, projectName: selected })}
                    disabled={!selected}
                    color="#ff0000"
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Add New Project</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewProjectName}
                            value={newProjectName}
                            placeholder="Enter Project Name"
                        />
                        <Button title="Create New Project" onPress={() => createNewProject()} />
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
        backgroundColor: '#ffffe0',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    projectButtonsContainer: {
        flex: 1,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
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
    input: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#ff0000',
    },
});

export default HomeScreen;

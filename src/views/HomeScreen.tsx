import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Modal, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { setUser, setProjectName } from '../store';
import ProjectButtons from '../Components/ProjectButtons';
import DeleteModal from '../Components/DeleteModal';
import homeScreenStyles from '../styles/homeScreenStyles'; // Import styles from separate file

const HomeScreen = () => {
    //GET USER and project
    const user = useSelector((state) => state.user.user);
    const project = useSelector((state) => state.user.project)
    const { uid, projects, email, permissionCamera } = user;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [selected, setSelected] = useState(null);
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const [buttonVibrations, setButtonVibrations] = useState(Array(projects.length).fill(false));
    const projectRef = useRef(null);

    useEffect(() => {
        projectRef.current = project;
        console.log('Updated project:', projectRef.current);
    }, [project]);
    const handleButtonPress = async (index, projectName) => {
        if (isDeleteActive) {
            const newButtonVibrations = [...buttonVibrations];
            newButtonVibrations[index] = !newButtonVibrations[index];
            setButtonVibrations(newButtonVibrations);
        } else {
            console.log(`here is the selected ${selected}`)

            const tempSelected = selected;
            setSelected(prevSelected => prevSelected === projectName ? null : projectName);
            if (selected && !isDeleteActive) {
                await dispatch(setProjectName({
                    blocks: [],
                    name: selected
                }))
                console.log(`ere isteh project ${JSON.stringify(project)}`)

                navigation.navigate('ProjectScreen', { uid, projectName: selected });
            }
        }
    };

    const handleDelete = () => {
        setIsDeleteActive(prev => !prev); // Toggle delete button state
    };

    const confirmDelete = async () => {
        await updateUser(uid, user, selected, 'delete');
        const updatedProjects = projects.filter(item => item !== selected);
        await dispatch(setUser({ uid, permissionCamera, email, projects: updatedProjects }));
        setDeleteModalVisible(false);
        setIsDeleteActive(false); // Reset delete button state
        setButtonVibrations(Array(projects.length).fill(false)); // Reset button vibrations
    };

    const createNewProject = async () => {
        if (newProjectName.trim() !== '') {
            try {
                await updateUser(uid, user, newProjectName, 'project');
                const updatedProjects = [...projects, newProjectName.trim()];
                await dispatch(setUser({ uid, permissionCamera, email, projects: updatedProjects }));
                setModalVisible(false);
                setNewProjectName('');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    };

    return (
        <View style={homeScreenStyles.container}>
            <View style={homeScreenStyles.projectButtonsContainer}>
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
            <View style={homeScreenStyles.bottomButtonsContainer}>
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
                {/* <Button
                    title="Go To project"
                    onPress={() => {
                        if (selected && !isDeleteActive) {
                            navigation.navigate('ProjectScreen', { uid, projectName: selected });
                        }
                    }}
                    disabled={!selected || isDeleteActive} // Disable button if no project is selected or delete mode is active
                    color="#ff0000"
                /> */}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={homeScreenStyles.centeredView}>
                    <View style={homeScreenStyles.modalView}>
                        <Text>Add New Project</Text>
                        <TextInput
                            style={homeScreenStyles.input}
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

export default HomeScreen;

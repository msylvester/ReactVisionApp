import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Image, Modal, Button, TextInput, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { setUser } from '../store';
import DeleteModal from '../Components/DeleteModal';
import imageMap from '../constants'; // Adjust the path as necessary
import homeScreenStyles from '../styles/homeScreenStyles';
const HomeScreen = () => {
    const user = useSelector((state) => state.user.user);
    const { uid, projects, email, permissionCamera } = user;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [selected, setSelected] = useState(null);

    const handleButtonPress = (projectName) => {
        setSelected(prevSelected => prevSelected === projectName ? null : projectName);
    };

    const goToProject = (projectName) => {
        navigation.navigate('ProjectScreen', { uid, projectName });
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        await updateUser(uid, user, selected, 'delete');
        const updatedProjects = projects.filter(item => item !== selected);
        await dispatch(setUser({
            uid,
            permissionCamera,
            email,
            projects: updatedProjects,
        }));
        setDeleteModalVisible(false);
    };

    const createNewProject = async () => {
        if (newProjectName.trim() !== '') {
            try {
                await updateUser(uid, user, newProjectName, 'project');
                const updatedProjects = [...projects, newProjectName.trim()];
                await dispatch(setUser({
                    uid,
                    permissionCamera,
                    email,
                    projects: updatedProjects,
                }));
                setModalVisible(false);
                setNewProjectName('');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    };

    const renderDeleteModal = () => {
        return (
            <DeleteModal
                confirmDelete={confirmDelete}
                setDeleteModal={setDeleteModalVisible}
                deleteModalVisible={deleteModalVisible}
            />
        );
    };
    const renderProjectButton = () => {
        return (
            <View style={styles.projectButtonsContainer}>
                <FlatList
                    data={projects}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                selected === item && styles.selectedButton
                            ]}
                            onPress={() => handleButtonPress(item)}
                        >
                            <Image source={imageMap.folder_img} style={styles.projectImage} resizeMode="contain" />
                            <Text style={styles.projectNameText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={3} // Display 3 buttons per row
                />
                {renderDeleteModal()}
            </View>
        );
    };
    // const renderProjectButton = () => {
    //     return (
    //         <View style={styles.projectButtonsContainer}>
    //             <FlatList
    //                 data={projects}
    //                 renderItem={({ item }) => (
    //                     <TouchableOpacity
    //                         style={[
    //                             styles.button,
    //                             selected === item && styles.selectedButton
    //                         ]}
    //                         onPress={() => handleButtonPress(item)}
    //                     >
    //                         <Image source={imageMap.folder_img} style={styles.projectImage} resizeMode="contain" />
    //                     </TouchableOpacity>
    //                 )}
    //                 keyExtractor={(item) => item}
    //                 numColumns={3} // Display 3 buttons per row
    //             />
    //             {renderDeleteModal()}
    //         </View>
    //     );
    // };

    return (
        <View style={styles.container}>
            {renderProjectButton()}
            <View style={styles.bottomButtonsContainer}>
                <Button
                    style={styles.modalText}
                    title="New Project"
                    onPress={() => setModalVisible(true)}
                    color="#ff0000"
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    disabled={!selected}
                    color="#ff0000"
                />
                <Button title="Go To Project" onPress={() => goToProject(selected)} disabled={!selected} color="#ff0000" />
            </View>
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
                        <Text>Add New Project</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewProjectName}
                            value={newProjectName}
                            placeholder="Enter Project Name"
                        />
                        <Button title="Create New Project" onPress={createNewProject} />
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
        backgroundColor: '#3F00FF', // Medium blue background color
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    projectImage: {
        width: '80%', // Make the image take up 80% of the button width
        height: undefined, // Allow height to adjust based on aspect ratio
        aspectRatio: 1, // Ensure the image maintains a square aspect ratio
    },
    selectedButton: {
        backgroundColor: '#2ecc71',
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#ff0000',
        fontWeight: 'bold',
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
    projectButtonsContainer: {
        flex: 1,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    projectNameText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
});

export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native'; // Import Modal component
import ImageCollection from '../Components/ImageCollection';
import TestProject from '../Components/TestProject';

//Todo: add camera usage to the screen
//
const ProjectScreen = (props) => {
    console.log(`inside ${JSON.stringify(props)} the project screen`)
    const { params: { uid, projectName } } = props.route;
    console.log(`the params equal ${JSON.stringify(uid)} and projectName ${projectName}`)

    // State to control the visibility of the modal
    const [modalVisible, setModalVisible] = useState(false);

    // Function to handle adding an image
    const handleAddImage = () => {
        // Open the modal when the "Add Image" button is pressed
        setModalVisible(true);
    };

    // Function to handle selecting an image from camera
    const handleSelectFromCamera = () => {
        // Add logic here to open camera
        console.log('Selecting image from camera...');
        // Close the modal after selection if needed
        setModalVisible(false);
    };

    // Function to handle selecting an image from image picker
    const handleSelectFromPicker = () => {
        // Add logic here to open image picker
        console.log('Selecting image from picker...');
        // Close the modal after selection if needed
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <ImageCollection user={uid} projectName='project_name' />
            {/* <TestProject /> */}
            {/* Button to add image */}
            <Button title="Add Image" onPress={handleAddImage} />
            {/* Modal for selecting image source */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Close modal on back button press or outside touch
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button title="Select from Camera" onPress={handleSelectFromCamera} />
                        <Button title="Select from Image Picker" onPress={handleSelectFromPicker} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default ProjectScreen;

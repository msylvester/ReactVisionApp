import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import ImageCollection from '../Components/ImageCollection';
import TestProject from '../Components/TestProject';
import AddImage from '../Components/AddImage';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '../Components/DeleteModal';
import { getProjects } from '../services/firebase';
import LocalImages from '../Components/LocalImages';
import { useDispatch } from 'react-redux';
const ProjectScreen = (props) => {
    const { params: { uid, projectName } } = props.route;
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(false);
    const [projectImages, setProjectImages] = useState([]);
    const dispatch = useDispatch()
    //populate redux too
    useEffect(() => {
        // Fetch images for the project before component mounts
        fetchProjectImages();

    }, []);

    const fetchProjectImages = async () => {
        try {
            // Make a get to firebase to get the images for a given project
            const response = await getProjects(projectName)
            console.log(`here is the response ${JSON.stringify(response)}`)
            if (response) {
                // const data = await response.json();
                const { blocks } = response
                console.log(`here is blocks ${blocks.length}`)
                setProjectImages(blocks); // Assuming your API response contains an array of images
            } else {
                console.error('Failed to fetch project images');
            }
        } catch (error) {
            console.error('Error fetching project images:', error);
        }
    };

    // //TODO fetch from redux the images 
    // const fetchProjectImages = () => {


    // }
    const handleNavigateToBlocks = async () => {
        try {
            await dispatch(setProjectName(selectedImage));
        } catch (e) {
            console.log(`here is the error ${e}`)
        }
        navigation.navigate('LeggoScreen', { uid, projectName });
    }

    const handleAddImage = () => {
        setModalVisible(true);
    };

    const handleSelectFromCamera = () => {
        setSelectedCamera(true);
        setModalVisible(false);
        setPickerVisible(true);
    };

    const handleSelectFromPicker = () => {
        setModalVisible(false);
        setPickerVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* <ImageCollection images={projectImages} />  */}
            {/* <LocalImages imagesData={projectImages} /> */}
            {projectImages.length > 0 && <LocalImages imagesData={projectImages} />}
            <Button title="Select Block" onPress={handleNavigateToBlocks} />
            <Button title="make some cool stuff" onPress={handleAddImage} />
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Button title="Select from Camera" onPress={handleSelectFromCamera} />
                        <Button title="Pick block from list" onPress={handleSelectFromPicker} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            {pickerVisible && <AddImage
                selectedCamera={selectedCamera}
                uid={uid}
                projectName={projectName}
                onPressClose={() => setPickerVisible(false)} />} */}
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

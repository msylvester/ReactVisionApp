import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import ImageCollection from '../Components/ImageCollection';
import TestProject from '../Components/TestProject';
import AddImage from '../Components/AddImage';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '../Components/DeleteModal';
import { getProjects } from '../services/firebase';
import LocalImages from '../Components/LocalImages';
import { useDispatch, useSelector } from 'react-redux';
import { setProject, updateBlocks } from '../store'
import LeggoModal from './LeggoModal';
const ProjectScreen = (props) => {
    const { params: { uid, projectName } } = props.route;
    const project = useSelector((state) => state.user.project)

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState(false);
    const [projectImages, setProjectImages] = useState([]);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    //populate redux too
    useEffect(() => {
        // Fetch images for the project before component mounts
        fetchProjectImages();

    }, []);
    useEffect(() => {
        // Fetch images for the project before component mounts
        //fetchProjectImages();
        console.log(`the project ${project.blocks}`)
        setProjectImages(project.blocks)
    }, [project]);
    const fetchProjectImages = async () => {
        try {
            // Make a get to firebase to get the images for a given project
            const response = await getProjects(projectName)
            console.log(`here is the response ${JSON.stringify(response)}`)
            if (response) {

                // const blocksFromFetch = response.blocks;
                // await dispatch(setProject({ name: projectName, blocks: blocksFromFetch }));
                // // 
                console.log(`projectBlocks: ${project.blocks}`)
                // const data = await response.json();
                const blocksFromFetch = response.blocks;
                console.log(`blocksFrom fetch ${blocksFromFetch}`)
                console.log(`project.blocks ${project.blocks.length}`)
                const updatedBlocks = [...project.blocks, ...blocksFromFetch]; // Using concat
                console.log(`here are the blocksafter updated ${updatedBlocks} `)

                await dispatch(setProject({
                    ...project,
                    blocks: updatedBlocks,
                }))
                console.log(`uppdated Blocks ${updatedBlocks} `)
                //setProjectImages(updatedBlocks); // Assuming your API response contains an array of images
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
        // setShow(true);
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

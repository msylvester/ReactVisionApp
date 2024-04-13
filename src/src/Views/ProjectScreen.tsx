import React from 'react';
import { View, Text } from 'react-native';
import ImageCollection from '../Components/ImageCollection';
import TestProject from '../Components/TestProject';
const ProjectScreen = (props) => {
    console.log(`inside ${JSON.stringify(props)} the project sreen`)
    const { params: { uid, projectName } } = props.route;
    console.log(`the params eqauls ${JSON.stringify(uid)} and projectName ${projectName}`)
    return (
        <View>
            <ImageCollection user={uid} projectName='project_name' />
            {/* <TestProject /> */}
        </View>
    );
};

export default ProjectScreen;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TouchableOpacity, Text } from 'react-native';
import ProjectScreen from './Views/ProjectScreen';
// import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Views/HomeScreen';
// import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            // options={({ navigation }) => ({
            //     headerTitle: 'Home',
            //     headerLeft: () => (
            //         <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            //             <Text>Press Here</Text>
            //         </TouchableOpacity>
            //     ),
            // })}
            />
            <Stack.Screen name="Details" component={ProjectScreen} />
        </Stack.Navigator>
    );
};



export default AppNavigator;

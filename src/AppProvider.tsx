import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import SignUp from './Views/SignUpSCreen';
import type { Routes } from './Routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    Provider,
    useDispatch,
    useSelector
} from 'react-redux';
import { store, setUser } from './store';
import App1 from './App1'

function AppProvider() {


    return (
        <Provider store={store}>
            <App1 />
        </Provider>
    );
}


export default AppProvider;
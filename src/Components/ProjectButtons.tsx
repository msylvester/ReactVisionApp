import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Animated, Easing } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../services/firebase';
import { create } from 'react-test-renderer';
import { setUser, updateProjects } from '../store';

//TODO: conidtionally render ProjectButtons with vibrate if delete selected is true

const ProjectButtons = ({ selected, projects, handleButtonPress, deleteSelect = false }) => {
    const shakeAnimation = new Animated.Value(0);

    const startShakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        if (deleteSelect) {
            startShakeAnimation();
        }
    }, [deleteSelect]);

    return (
        <FlatList
            data={projects}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.button,
                        selected === item && styles.selectedButton,
                        deleteSelect && { transform: [{ translateX: shakeAnimation }] }, // Apply animated style conditionally
                    ]}
                    onPress={() => handleButtonPress(item)}
                >
                    <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffe0', // Light yellow background color
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    button: {
        backgroundColor: '#ff0000', // Red button color
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff00', // Yellow button text color
        fontWeight: 'bold',
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
        color: '#ff0000', // Red font color
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#ff0000', // Red font color
    },
    projectButtonsContainer: {
        flex: 1,
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
export default ProjectButtons
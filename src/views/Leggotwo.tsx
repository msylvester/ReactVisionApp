import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MyComponent = () => {
    // State variables for color, dimensions, and text input
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedDimension, setSelectedDimension] = useState('');
    const [textInput, setTextInput] = useState('');

    // Function to handle color selection
    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    // Function to handle dimension selection
    const handleDimensionSelect = (dimension) => {
        setSelectedDimension(dimension);
    };

    return (
        <View style={styles.container}>
            {/* Color selection buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.colorButton, { backgroundColor: selectedColor === 'red' ? 'red' : 'transparent' }]}
                    onPress={() => handleColorSelect('red')}
                />
                <TouchableOpacity
                    style={[styles.colorButton, { backgroundColor: selectedColor === 'green' ? 'green' : 'transparent' }]}
                    onPress={() => handleColorSelect('green')}
                />
                <TouchableOpacity
                    style={[styles.colorButton, { backgroundColor: selectedColor === 'blue' ? 'blue' : 'transparent' }]}
                    onPress={() => handleColorSelect('blue')}
                />
            </View>

            {/* Dimension selection buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.dimensionButton, { backgroundColor: selectedDimension === 'small' ? 'gray' : 'transparent' }]}
                    onPress={() => handleDimensionSelect('2x1')}
                >
                    <Text style={styles.dimensionText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.dimensionButton, { backgroundColor: selectedDimension === 'medium' ? 'gray' : 'transparent' }]}
                    onPress={() => handleDimensionSelect('4x1')}
                >
                    <Text style={styles.dimensionText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.dimensionButton, { backgroundColor: selectedDimension === 'large' ? 'gray' : 'transparent' }]}
                    onPress={() => handleDimensionSelect('4x4')}
                >
                    <Text style={styles.dimensionText}>3</Text>
                </TouchableOpacity>
            </View>

            {/* Text input */}
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
                placeholder="Enter text"
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    colorButton: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    dimensionButton: {
        width: 80,
        height: 50,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dimensionText: {
        fontSize: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default MyComponent;
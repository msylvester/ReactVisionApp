import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

const LeggoScreen = () => {
    // Mock data for image paths, replace this with actual logic to fetch image paths from the /src/img folder
    const imagePaths = [
        require('../img/image1.jpg'),
        require('../img/image2.jpg'),
        require('../img/image3.jpg'),
        // Add more image paths as needed
    ];

    const handleImageSelect = (imagePath: any) => {
        // Handle selection of the image, e.g., navigate to a detail screen
        console.log('Selected image:', imagePath);
    };

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {imagePaths.map((imagePath, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleImageSelect(imagePath)}
                        style={{ margin: 5 }}
                    >
                        <Image
                            source={imagePath}
                            style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default LeggoScreen;

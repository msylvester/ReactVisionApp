// HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

interface HomeScreenProps {
    navigation: any; // or use appropriate navigation type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};

export default HomeScreen;

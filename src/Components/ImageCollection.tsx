import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const ImageCollection = ({ user, projectName }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        fetchImageData();
    }, []);

    const fetchImageData = () => {
        // Assuming images are named in a specific pattern, like 'image1.png', 'image2.png', etc.
        const images = [
            require(`../img/Camera.png`),
            require(`../img/phone.png`),
            // Add more images as needed
        ];
        setImageData(images);
        setIsLoading(false);
    };

    const renderItem = ({ item }) => {
        return (
            <Image style={styles.image} source={item} />
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={imageData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
    },
});

export default ImageCollection;


// import React, { useState, useEffect, useCallback } from 'react';
// import { View, FlatList, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import TestProject from './TestProject';
// import storage from '@react-native-firebase/storage';
// import PictureCollection from './PictureCollection';
// import phone from '../img/phone.png';
// // //gs://leggomyeggo.appspot.com/svEpZHdospMrWQQN1XpyDp42nZ82/project_name/neProj.png

// const ImageCollection = ({ user, projectName }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [imageData, setImageData] = useState([]);
//     console.log(`the ${user} and projectName${projectName}`)
//     const uris = {
//         { uri: phone }
// }
// useEffect(() => {
//     console.log(`fetching `)
//     fetchImageData();
// }, []);
// //  https://firebasestorage.googleapis.com/v0/b/leggomyeggo.appspot.com/o/svEpZHdospMrWQQN1XpyDp42nZ82%2Fproject_name%2FneProj.png?alt=media&token=c7467f88-6f1f-45d3-af9d-ffe1bd6b2f61
// const fetchImageData = async () => {
//     try {
//         const imagesRef = storage().ref(`${user}/${projectName}/`);
//         const imageUrls = await imagesRef.listAll();

//         const urls = await Promise.all(
//             imageUrls.items.map(async (imageRef) => {
//                 console
//                 const url = await imageRef.getDownloadURL();
//                 console.log(`here is the url ${url}`)
//                 return url;
//             })
//         );
//         console.log(`the urls are ${urls}`)
//         setImageData(urls); // Create a new array
//         setIsLoading(false);
//     } catch (error) {
//         console.error('Error fetching image data:', error);
//         setIsLoading(false);
//     }
// };

// const renderItem = ({ item }) => {
//     console.log(`the item is ${item}`)
//     return (

//         < Image style={styles.image} source={{ uri: item }} />
//     )
// };
// const renderActivity = () => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <ActivityIndicator color={'blue'} size="large" />
// </View>)
// return (
//     <View style={styles.container}>
//         {/* {isLoading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <FlatList
//                     data={imageData}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     numColumns={2} // Change this as per your requirement
//                 />
//             )} */}
//         {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <PictureCollection imageUrls={imageData} />}
//         {/* {isLoading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (imageData.map((item, index) =>
//                 <TestProject key={index} imageData={item} />)
//             )} */}
//     </View>
// );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     image: {
//         width: 150,
//         height: 150,
//         margin: 5,
//     },
// });


// export default ImageCollection;

// // export default ImageCollection;
// // import React, { useState, useEffect } from 'react';
// // import { View, Image, ActivityIndicator } from 'react-native';
// // import storage from '@react-native-firebase/storage';

// // const ImageCollection = ({ user, projectName }) => {
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [imageData, setImageData] = useState([]);

// //     useEffect(() => {
// //         fetchImageData();
// //     }, []);

// //     const fetchImageData = async () => {
// //         try {
// //             const imagesRef = storage().ref(`${user}/${projectName}/`);
// //             const imageUrls = await imagesRef.listAll();
// //             const urls = await Promise.all(
// //                 imageUrls.items.map(async (imageRef) => {
// //                     const url = await imageRef.getDownloadURL();
// //                     return url;
// //                 })
// //             );
// //             setImageData(urls);
// //             setIsLoading(false);
// //         } catch (error) {
// //             console.error('Error fetching image data:', error.message);
// //             setIsLoading(false);
// //         }
// //     };

// //     const renderItem = ({ item }) => {
// //         return (
// //             <Image style={styles.image} source={{ uri: item }} />
// //         );
// //     };

// //     return (
// //         <View style={styles.container}>
// //             {isLoading ? (
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             ) : (
// //                 <FlatList
// //                     data={imageData}
// //                     renderItem={renderItem}
// //                     keyExtractor={(item, index) => index.toString()}
// //                     numColumns={2}
// //                 />
// //             )}
// //         </View>
// //     );
// // };
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         backgroundColor: '#F5FCFF',
// //     },
// //     image: {
// //         width: 150,
// //         height: 150,
// //         margin: 5,
// //     },
// // });

// // // export default ImageCollection;

// // export default ImageCollection;

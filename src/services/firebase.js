import firestore from '@react-native-firebase/firestore';

export const createUser = async userData => {
  const {uid} = userData;
  console.log(`inside create user and (uid) ${uid}`);
  try {
    const userRef = await firestore()
      .collection('users')
      .doc(uid)
      .set(userData);
    console.log(`here is the userRef ${JSON.stringify(userRef)}`);
    return userRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async userId => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await firestore().collection('users').doc(userId).update(userData);
    console.log('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

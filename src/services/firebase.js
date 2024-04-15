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
    // return userRef.id;
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

export const updateUser = async (userId, userData, change, changeType) => {
  try {
    console.log(
      `inside update User ${userId} and the data is ${userData} and the change type ${changeType}`,
    );
    if (changeType === 'project') {
      console.log('about to udpate');

      const result = await firestore()
        .collection('users')
        .doc(userId)
        .update({
          projects: firestore.FieldValue.arrayUnion(change.trim()),
        });
      console.log(`finished updating and the result is ${result}`);
      return;
    }
    if (changeType === 'delete') {
      try {
        const userRef = firestore().collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const updatedProjects = userData.projects.filter(
            project => project !== change,
          );

          await userRef.update({projects: updatedProjects});
          console.log('Project removed from Firestore successfully.');
        } else {
          console.error('User document not found.');
        }
      } catch (error) {
        console.error('Error removing project from Firestore:', error);
      }
      return;
    }

    console.log('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

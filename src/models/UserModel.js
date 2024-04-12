// UserModel.js
import ProjectModel from './ProjectModel';
import AsyncStorage from 'react-native-async-storage/async-storage/';

// Example structure for user data model

class User {
  constructor(id, email, projects = []) {
    this.id = id;
    this.email = email;
    this.projects = projects;
    this.permissions = false;
  }
  addPermisions(camera, imagePicker) {
    if (camera && imagePicker) return true;
  }
  addProject(projectName) {
    this.projects.push(projectName);
  }
  createProjectRecord(project) {
    //make sure every object is updated
  }

  removeProject(projectName) {
    const index = this.projects.indexOf(projectName);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }

  createDB = async userData => {
    //first create it in async storage
    //if that succeeds CREATE on firestore
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved locally');
    } catch (error) {
      console.error('Error saving user data locally:', error);
    }
  };
  // You can add more methods as needed
  udpateDB = async (userid, changes) => {};
  getDB = async userid => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userid');
      if (userDataJSON !== null) {
        const userData = JSON.parse(userDataJSON);
        console.log('User data retrieved locally:', userData);
        return userData;
      }
    } catch (error) {
      console.error('Error retrieving user data locally:', error);
    }
  };
  deleteDB = async userid => {
    //push the changes to the db
    //project record
  };
}

export default User;

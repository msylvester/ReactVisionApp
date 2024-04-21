// store.js

import {configureStore, createSlice} from '@reduxjs/toolkit';
//create an image atribute
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: '',
      email: '',
      permissionCamera: false,
      permissionPhotolibrary: false,
      projects: [],
    },
    project: {
      name: '',
      images: [],
    },
    image: {
      uri: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log(`imside user and ${JSON.stringify(action.payload)}`);
      state.user = action.payload;
    },
    setImageRedux: (state, action) => {
      console.log(`inside set image ${JSON.stringify(action.payload)}`);
      state.image = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    updateProjects: (state, action) => {
      console.log(
        `her eis the state ${JSON.stringify(
          state,
        )}, and action ${JSON.stringify(action)}`,
      );
    },
    //send true
    setCameraPermission: (state, action) => {
      console.log(
        `inside setCameraPermission AND ${JSON.stringify(action.payload)}`,
      );
      state.user = action.payload;
    },
    clearCameraPermission: state => {
      state.permissionCamera = false;
    },
  },
});

export const {
  setUser,
  updateProjects,
  clearUser,
  setCameraPermission,
  clearCameraPermission,
  setImageRedux,
} = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectImage = state => state.user.image;
export const selectProject = state => state.user.project;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // Add other reducers if needed
  },
});

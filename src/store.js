// store.js

import {configureStore, createSlice} from '@reduxjs/toolkit';

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
  },
  reducers: {
    setUser: (state, action) => {
      console.log(`imside user and ${JSON.stringify(action.payload)}`);
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    updateProjects: (state, action) => {
      console.log(`her eis the state, and action`);
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
} = userSlice.actions;

export const selectUser = state => state.user.user;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // Add other reducers if needed
  },
});

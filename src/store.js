// store.js

import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      permissionCamera: false,
      permissionPhotolibrary: false,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    //send true
    setCameraPermission: (state, action) => {
      state.permissionCamera = action.payload;
    },
    clearCameraPermission: state => {
      state.permissionCamera = false;
    },
  },
});

export const {setUser, clearUser, setCameraPermission, clearCameraPermission} =
  userSlice.actions;

export const selectUser = state => state.user.user;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // Add other reducers if needed
  },
});

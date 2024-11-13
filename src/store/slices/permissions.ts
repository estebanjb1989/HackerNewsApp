import { createSlice } from "@reduxjs/toolkit";

interface IPermissionsState {
  notificationsPermissionStatus: number | null;
}

const initialState = {
  notificationsPermissionStatus: null,
} as IPermissionsState;

const permissionsSlice = createSlice({
  name: "permissionsSlice",
  initialState,
  reducers: {
    setNotificationsPermissionStatus(state, action) {
      state.notificationsPermissionStatus = action.payload
    },    
  },
});

export const {
  setNotificationsPermissionStatus
} = permissionsSlice.actions;

export default permissionsSlice.reducer;

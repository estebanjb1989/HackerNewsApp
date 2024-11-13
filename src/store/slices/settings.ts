import { createSlice } from "@reduxjs/toolkit";

interface ISettingsState {
  notificationsEnabled: boolean;
}

const initialState = {
  notificationsEnabled: false,
} as ISettingsState;

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setNotificationsEnabled(state, action) {
      state.notificationsEnabled = action.payload
    },    
  },
});

export const {
  setNotificationsEnabled
} = settingsSlice.actions;

export default settingsSlice.reducer;

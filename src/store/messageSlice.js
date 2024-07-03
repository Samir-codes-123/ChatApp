import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  messages: [], //map
};
const msgSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    //login/start
    login: (state, action) => {
      state.status = true;
      state.messages = action.payload;
    },
    // add msg
    addMsg: (state, action) => {
      state.messages.unshift(action.payload);
    },
    // remove
    rmMsg: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.$id !== action.payload,
      );
    },
    //update
    // logout/end
    logout: (state) => {
      state.status = false;
      state.messages = [];
    },
  },
});
export const { login, addMsg, rmMsg } = msgSlice.actions;
export default msgSlice.reducer;

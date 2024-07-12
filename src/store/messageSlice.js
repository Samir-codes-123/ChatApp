import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  userInfo: null,
  messages: [], //map
  images: null,
};
const msgSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    //login/start
    login: (state, action) => {
      state.status = true;
      state.userInfo = action.payload;
      console.log("user", state.userInfo);
    },
    intialMsg: (state, action) => {
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
    updateMsg: (state, action) => {
      state.messages = state.messages.map((message) => {
        if (message.$id === action.payload.$id) {
          return { ...message, body: action.payload.body };
        }
        return message;
      });
    },
    // logout/end
    logout: (state) => {
      state.status = false;
      state.userInfo = null;
    },
  },
});
export const { login, addMsg, rmMsg, intialMsg, logout, updateMsg } =
  msgSlice.actions;
export default msgSlice.reducer;

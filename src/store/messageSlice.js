import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [], //map
};
const msgSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    //login/start
    login: (state, action) => {
      state.messages = action.payload;
    },
    // add msg
    addMsg: (state, action) => {
      state.messages.push(action.payload);
    },
    // remove
    //update
    // logout/end
  },
});
export const { login, addMsg } = msgSlice.actions;
export default msgSlice.reducer;

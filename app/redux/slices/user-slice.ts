import {createSlice} from '@reduxjs/toolkit';
export const user = createSlice({
  name: 'user',
  initialState: {
    users: [],
    authanticated: '-1',
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    changeAuthanticated: (state, action) => {
      state.authanticated = action.payload;
    },
  },
});

export const {addUser, changeAuthanticated} = user.actions;
export default user.reducer;

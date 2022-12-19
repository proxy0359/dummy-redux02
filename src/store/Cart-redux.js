import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  showCart: false,
  notifications: null,
};

const cartRedux = createSlice({
  name: "cartRedux",
  initialState: defaultState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    cartStatus(state, action) {
      state.notifications = {
        title: action.payload.title,
        status: action.payload.status,
        description: action.payload.description,
      };
    },
  },
});
export const cartAction = cartRedux.actions;
export default cartRedux;

import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  showCart: false,
};

const cartRedux = createSlice({
  name: "cartRedux",
  initialState: defaultState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
  },
});
export const cartAction = cartRedux.actions;
export default cartRedux;

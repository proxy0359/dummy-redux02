import { configureStore } from "@reduxjs/toolkit";
import Items from "./Item-redux";
import cartRedux from "./Cart-redux";

const store = configureStore({
  reducer: { item: Items.reducer, cart: cartRedux.reducer },
});

export default store;

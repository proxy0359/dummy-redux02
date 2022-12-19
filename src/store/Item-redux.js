import { createSlice } from "@reduxjs/toolkit";
import { cartAction } from "./Cart-redux";

const defaultState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const Items = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addItems(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalAmount++;
      state.changed = true;

      if (!existingItem) {
        const item = {
          name: newItem.name,
          price: newItem.price,
          amount: state.totalAmount,
          totalPrice: newItem.price,
          id: newItem.id,
        };

        state.items.push(item);
      } else {
        existingItem.amount++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount--;
      state.changed = true;

      if (existingItem.amount === 1) {
        state.items = state.items.filter((items) => items.id !== id);
        existingItem.amount--;
      } else {
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        existingItem.amount--;
      }
    },
  },
});

export const itemAction = Items.actions;

export default Items;

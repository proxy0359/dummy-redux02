import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const Items = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItems(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalAmount++;

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

      if (existingItem.amount === 1) {
        state.items = state.items.filter((items) => items.id !== id);
        existingItem.amount--;
        state.totalAmount--;
      } else {
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        existingItem.amount--;
        state.totalAmount--;
      }
    },
  },
});

export const itemAction = Items.actions;

export default Items;

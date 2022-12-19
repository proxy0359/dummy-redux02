import { createSlice } from "@reduxjs/toolkit";
import { cartAction } from "./Cart-redux";

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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartAction.cartStatus({
        title: "processing...",
        status: "proccessing",
        description: "data is being",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/redux-item.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("There is an error in the response");
      }

      const responseData = response.json();
    };
    try {
      await sendRequest();
      dispatch(
        cartAction.cartStatus({
          title: "Sent Successfully",
          status: "success",
          description: "Data is sent",
        })
      );
    } catch {
      dispatch(
        cartAction.cartStatus({
          title: "There is an Error ",
          status: "error",
          description: "Data is unable to send because of an error",
        })
      );
    }
  };
};

export const itemAction = Items.actions;

export default Items;

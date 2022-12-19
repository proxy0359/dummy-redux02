import { cartAction } from "./Cart-redux";
import { itemAction } from "./Item-redux";
import { useDispatch } from "react-redux";

export const getData = () => {
  return async (dispatch) => {
    const response = async () => {
      const fetchData = await fetch(
        "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/redux-item.json"
      );
      if (!fetchData.ok) {
        throw new Error("there was an error getting the data");
      }
      const updatedData = await fetchData.json();

      
      return updatedData;
    };
    try {
      const data = await response();
      dispatch(itemAction.replaceCart(data));
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

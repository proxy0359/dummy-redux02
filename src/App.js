import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "./store/Cart-redux";
import Notification from "./components/UI/Notifcation";

import { sendCartData } from "./store/Cart-Action";
import { itemAction } from "./store/Item-redux";
import { getData } from "./store/Cart-Action";

let runOnce = true;

function App() {
  const dispatch = useDispatch();
  const notificationStatus = useSelector((state) => state.cart.notifications);
  const showItem = useSelector((state) => state.cart.showCart);
  const item = useSelector((state) => state.item);
  const cartItem = useSelector((state) => state.item.items);

  useEffect(() => {
    if (runOnce) {
      runOnce = false;
      return;
    }
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (runOnce) {
      runOnce = false;
      return;
    }
    if (item.changed) {
      dispatch(sendCartData(cartItem));
    }
  }, [item]);

  return (
    <Fragment>
      {notificationStatus && (
        <Notification
          title={notificationStatus.title}
          message={notificationStatus.description}
          status={notificationStatus.status}
        />
      )}

      <Layout>
        {showItem && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "./store/Cart-redux";
import Notification from "./components/UI/Notifcation";

import { sendCartData } from "./store/Item-redux";

let runOnce = true;

function App() {
  const dispatch = useDispatch();
  const notificationStatus = useSelector((state) => state.cart.notifications);
  const showItem = useSelector((state) => state.cart.showCart);
  const item = useSelector((state) => state.item);

  useEffect(() => {
    if (runOnce) {
      runOnce = false;
      return;
    }
    dispatch(sendCartData(item));
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

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showItem = useSelector((state) => state.cart.showCart);
  const item = useSelector((state) => state.item);

  useEffect(() => {
    fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/redux-item.json",
      {
        method: "PUT",
        body: JSON.stringify(item),
      }
    );
  }, [item]);

  return (
    <Layout>
      {showItem && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

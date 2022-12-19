import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { itemAction } from "../../store/Item-redux";

const Cart = (props) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.item.items);
  const price = useSelector((state) => state.item.items.price);
  const itemAmount = useSelector((state) => state.item.totalAmount);

  const noItems = itemAmount ? (
    name.map((items) => (
      <CartItem
        key={items.id}
        item={{
          title: items.name,
          quantity: itemAmount,
          total: items.totalPrice,
          price: items.price,
          id: items.id,
        }}
      />
    ))
  ) : (
    <p>You currently have no items in cart</p>
  );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{noItems}</ul>
    </Card>
  );
};

export default Cart;

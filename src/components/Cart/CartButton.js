import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/Cart-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.item.totalAmount);

  const showCartHandler = () => {
    dispatch(cartAction.toggle());
  };
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{amount}</span>
    </button>
  );
};

export default CartButton;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { toggleCartHidden } from "../../store/cart/cart.action";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderCartItems = () => {
    return cartItems.map((item) => <CartItem key={item.id} cartItem={item} />);
  };

  const handleCheckout = () => {
    navigate("checkout");
    dispatch(toggleCartHidden());
  }

  return (
    <CartDropdownContainer>
      <span>Total: ${cartTotal}</span>
      <CartItems>
        {cartItems.length ? (
          renderCartItems()
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

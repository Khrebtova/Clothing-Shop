import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const renderCartItems = () => {
    return cartItems.map((item) => <CartItem key={item.id} cartItem={item} />);
  };
  return (
    <div className="cart-dropdown-container">
      <span>Total: ${cartTotal}</span>
      <div className="cart-items">
        {cartItems.length ? (
          renderCartItems()
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={() => navigate("checkout")}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

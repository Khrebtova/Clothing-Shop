import React, { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const headerValues = [
    "Product",
    "Description",
    "Quantity",
    "Price",
    "Total",
    "Remove",
  ];
  const renderCartItems = () => {
    return cartItems.map((item) => <CheckoutItem key={item.id} item={item} />);
  };
  const renderHeader = () => {
    return headerValues.map((value) => (
      <div className="header-block" key ={value}>
        <span>{value}</span>
      </div>
    ));
  };
  return (
    <div className="checkout-container">
      <div className="checkout-header">{renderHeader()}</div>
      {cartItems ? renderCartItems() : <h1>nothing in the cart</h1>}
      <div className="total">TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;

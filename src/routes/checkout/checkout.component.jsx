import React, { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../context/cart.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";

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
      <HeaderBlock key={value}>
        <span>{value}</span>
      </HeaderBlock>
    ));
  };

  return (
    <CheckoutContainer>
      <CheckoutHeader>{renderHeader()}</CheckoutHeader>
      {cartItems ? renderCartItems() : <h1>nothing in the cart</h1>}
      <Total>TOTAL: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;

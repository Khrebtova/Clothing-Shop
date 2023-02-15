import React from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;

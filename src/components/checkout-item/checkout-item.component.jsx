import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeOneItem,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Price,
  RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleClearItemFromCart = () =>
    dispatch(clearItemFromCart(cartItems, item));
  const handleAddOneItem = () => dispatch(addItemToCart(cartItems, item));
  const handleRemoveOneItem = () => dispatch(removeOneItem(cartItems, item));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={handleRemoveOneItem}>&#10094;</Arrow>
        {quantity}
        <Arrow onClick={handleAddOneItem}>&#10095;</Arrow>
      </Quantity>
      <Price>${price}</Price>
      <Price>${price * quantity}</Price>
      <RemoveButton onClick={handleClearItemFromCart}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

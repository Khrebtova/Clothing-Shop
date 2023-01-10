import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
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
  const { removeOneItem, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const handleClearItemFromCart = () => clearItemFromCart(item);
  const handleAddOneItem = () => addItemToCart(item);
  const handleRemoveOneItem = () => removeOneItem(item);

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

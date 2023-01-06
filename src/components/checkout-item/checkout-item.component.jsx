import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
  const { imageUrl, name, price, quantity } = item;
  const { removeOneItem, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const handleClearItemFromCart = () => clearItemFromCart(item);
  const handleAddOneItem = () => addItemToCart(item);
  const handleRemoveOneItem = () => removeOneItem(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={handleRemoveOneItem}>
          &#10094;
        </div>
        {quantity} 
        <div className="arrow" onClick={handleAddOneItem}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <span className="price">${price*quantity}</span>
      <div className="remove-button" onClick={handleClearItemFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;

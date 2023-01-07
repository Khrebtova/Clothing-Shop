import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;
  const { removeOneItem, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const handleClearItemFromCart = () => clearItemFromCart(cartItem);
  const handleAddOneItem = () => addItemToCart(cartItem);
  const handleRemoveOneItem = () => removeOneItem(cartItem);
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
        <div>
          <button className="arrow" onClick={handleAddOneItem}>
            +
          </button>
          <button className="arrow" onClick={handleRemoveOneItem}>
            -
          </button>
          {/* <button className='arrow' onClick={handleClearItemFromCart}>❌</button> */}
        </div>
      </div>
    </div>
  );
};

export default CartItem;

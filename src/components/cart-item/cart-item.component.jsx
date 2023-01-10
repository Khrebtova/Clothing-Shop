import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;
  const { removeOneItem, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  //const handleClearItemFromCart = () => clearItemFromCart(cartItem);
  const handleAddOneItem = () => addItemToCart(cartItem);
  const handleRemoveOneItem = () => removeOneItem(cartItem);
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
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
          {/* <button className='arrow' onClick={handleClearItemFromCart}>X</button> */}
        </div>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

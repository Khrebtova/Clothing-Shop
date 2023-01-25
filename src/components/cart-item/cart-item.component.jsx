import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeOneItem } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { imageUrl, price, name, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  //const handleClearItemFromCart = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const handleAddOneItem = () => dispatch(addItemToCart(cartItems, cartItem));
  const handleRemoveOneItem = () =>
    dispatch(removeOneItem(cartItems, cartItem));

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

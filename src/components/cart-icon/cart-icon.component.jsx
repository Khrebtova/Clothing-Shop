import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { toggleCartHidden } from "../../store/cart/cart.action";
import { selectCartItemsCount } from "../../store/cart/cart.selector";
const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartItemsCount);
  const handleCartOpenClose = () => dispatch(toggleCartHidden());

  return (
    <CartIconContainer onClick={handleCartOpenClose}>
      <ShoppingIcon />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

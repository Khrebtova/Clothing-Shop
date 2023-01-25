import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.action.types";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const handleRemoveItemFromCart = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const handleRemoveOneItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (cartItems, item) => {
  const newCartItems = addCartItem(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, item) => {
  const newCartItems = handleRemoveItemFromCart(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeOneItem = (cartItems, item) => {
  const newCartItems = handleRemoveOneItem(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const toggleCartHidden = () =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART_HIDDEN);

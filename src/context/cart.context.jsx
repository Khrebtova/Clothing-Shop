import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
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

const countItems = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const countTotal = (cartItems) => {
  return cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );
};

export const CartContext = createContext({
  cartHidden: true,
  setCartHidden: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeOneItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartHidden: true,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  TOGGLE_CART_HIDDEN: "TOGGLE_CART_HIDDEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
};

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        cartHidden: !state.cartHidden,
      };
    default:
      throw new Error(`Unhandled action type: ${type} in cart reducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { cartItems, cartItemsCount, cartTotal, cartHidden } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartItemsCount = countItems(newCartItems);
    const newCartTotal = countTotal(newCartItems);
    const payload = {
      cartItems: newCartItems,
      cartItemsCount: newCartItemsCount,
      cartTotal: newCartTotal,
    };
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const toggleCartHidden = () => {
      dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_HIDDEN));
  };

  const addItemToCart = (item) => {
    const newCartItems = addCartItem(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (item) => {
    const newCartItems = handleRemoveItemFromCart(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };
  const removeOneItem = (item) => {
    const newCartItems = handleRemoveOneItem(cartItems, item);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartHidden,
    toggleCartHidden,
    cartItems,
    addItemToCart,
    removeOneItem,
    clearItemFromCart,
    cartItemsCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

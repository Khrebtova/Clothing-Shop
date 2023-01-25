import { CART_ACTION_TYPES } from "./cart.action.types";

export const CART_INITIAL_STATE = {
  cartHidden: true,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        cartHidden: !state.cartHidden,
      };

    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};

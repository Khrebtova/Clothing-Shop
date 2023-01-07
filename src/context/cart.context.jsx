import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [cartHidden, setCartHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(countItems(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(countTotal(cartItems));
  }, [cartItems]);

  const toggleCartHidden = () => setCartHidden(!cartHidden);
  const addItemToCart = (item) => setCartItems(addCartItem(cartItems, item));
  const clearItemFromCart = (item) =>
    setCartItems(handleRemoveItemFromCart(cartItems, item));
  const removeOneItem = (item) =>
    setCartItems(handleRemoveOneItem(cartItems, item));

  const value = {
    cartHidden,
    setCartHidden,
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

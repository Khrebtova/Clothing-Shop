import React, { createContext } from "react";

export const CartContext = createContext({
  cartHidden: true,
  setCartHidden: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartHidden, setCartHidden] = React.useState(true);

  const toggleCartHidden = () => setCartHidden(!cartHidden);

  const value = { cartHidden, setCartHidden, toggleCartHidden };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

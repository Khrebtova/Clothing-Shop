import React, { Fragment, useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Logo from "../../assets/coffee-stain-1.png";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {
  NavigationContainer,
  LogoContainer,
  NavLinkContainer,
  NavLink,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { cartHidden } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <img
            src={Logo}
            alt="logo"
            className="m-logo"
            style={{ height: "90px" }}
          />
          {/* <Logo className="logo" /> */}
        </LogoContainer>
        <NavLinkContainer>
          <NavLink to="shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="sign-in">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinkContainer>
        {cartHidden ? null : <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

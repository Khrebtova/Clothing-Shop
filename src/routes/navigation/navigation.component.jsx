import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartHidden } from "../../store/cart/cart.selector";
import Logo from "../../assets/malina.png";
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
  const cartHidden = useSelector(selectCartHidden);
  const dispatch = useDispatch();
  const handleSignOut = () => dispatch(signOutStart());

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
            <NavLink as="span" onClick={handleSignOut}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="sign-in">SIGN IN</NavLink>
          )}
          {currentUser ? <CartIcon /> : null }
        </NavLinkContainer>
        {cartHidden || !currentUser ? null : <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

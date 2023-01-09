import React, { Fragment, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { Outlet, Link } from "react-router-dom";
//import { ReactComponent as Logo } from "../../assets/crown.svg";
import Logo from "../../assets/coffee-stain-1.png";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartHidden } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={Logo} alt="logo" className="m-logo" />          
          {/* <Logo className="logo" /> */}
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="sign-in">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {cartHidden ? null : <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

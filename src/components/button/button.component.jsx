import React from "react";
import "./button.styles.scss";

/*
default button
inverted button
google sign in button
*/

const buttonTypeClasses = {
  google: "google-sign-in",
  inverted: "inverted",
  default: "",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${buttonTypeClasses[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;

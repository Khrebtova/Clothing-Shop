import React, { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const handleAddItemToCart = () => {
    addItemToCart(product);
  }
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddItemToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;

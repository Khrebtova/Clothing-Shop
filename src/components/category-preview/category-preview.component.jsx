import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const previewProducts = products.filter((_, idx) => idx < 4);
  return (
    <div className="category-preview-container">
      <h2>
        <span onClick={() => navigate(`/shop/${title}`)}>
          {title.toUpperCase()}
        </span>
      </h2>
      <div className="preview">
        {previewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;

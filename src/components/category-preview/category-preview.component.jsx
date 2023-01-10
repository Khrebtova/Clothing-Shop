import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  Preview,
} from "./category-preview.styles.jsx";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const previewProducts = products.filter((_, idx) => idx < 4);

  return (
    <CategoryPreviewContainer>
      <CategoryPreviewTitle>
        <span onClick={() => navigate(`/shop/${title}`)}>
          {title.toUpperCase()}
        </span>
      </CategoryPreviewTitle>
      <Preview>
        {previewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

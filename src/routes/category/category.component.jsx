import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";
import {
  CategoryPageContainer,
  CategoryTitle,
  CategoryContainer,
} from "./category.styles.jsx";

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoriesMap = useSelector(selectCategories);
  
  const [products, setProducts] = useState(categoriesMap[category]);
  
  console.log(category, products);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <CategoryPageContainer>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </CategoryPageContainer>
  );
};

export default CategoryPage;

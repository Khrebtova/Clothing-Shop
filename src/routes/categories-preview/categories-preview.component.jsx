import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  console.log(categoriesMap);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((key) => {
          return (
            <CategoryPreview
              key={key}
              title={key}
              products={categoriesMap[key]}
            />
          );
        })}
    </Fragment>
  );
};

export default CategoriesPreview;

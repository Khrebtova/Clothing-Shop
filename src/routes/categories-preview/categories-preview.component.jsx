import React, { Fragment, useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
  
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
}

export default CategoriesPreview
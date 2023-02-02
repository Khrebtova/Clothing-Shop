import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategories , selectCategoriesIsLoading} from "../../store/categories/categories.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading); 
  
  if(isLoading) return <Spinner />;

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

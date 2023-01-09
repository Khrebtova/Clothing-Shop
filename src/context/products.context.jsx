import React, { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log("products", products)
  // add use effect to add data to firestore database just once when the app is loaded, then delete it to avoid adding the same data again and again
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect (() => {
    const getCategoriesMap = async () =>  {
      const categoriesMap = await getCategoriesAndDocuments();
      setProducts(categoriesMap);
    }
    getCategoriesMap();
  }, [])

  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

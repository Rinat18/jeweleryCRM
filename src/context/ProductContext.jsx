import React, { createContext, useContext, useReducer, useState } from "react";
import { API, PRODUCT_ACTIONS } from "../consts/const";
import axios from "axios";

const productContext = createContext();
export const useProduct = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  categories: [],
  oneproduct: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case PRODUCT_ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case PRODUCT_ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneproduct: action.payload };
    default:
      return state;
  }
};
export default function ProductContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [page, setPage] = useState(1);

  //! GET ALL PRODUCT
  const getProducts = async (page) => {
    try {
      const { data } = await axios(`${API}:8000/api/products/?page=${page}`);
      dispatch({
        type: PRODUCT_ACTIONS.GET_PRODUCTS,
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! GET CATEGORIES

  const getCategories = async () => {
    try {
      const { data } = await axios(`${API}:8000/api/categories/`);
      dispatch({
        type: PRODUCT_ACTIONS.GET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! ADD PRODUCT

  const addProduct = async (formdata) => {
    try {
      await axios.post(`${API}:8000/api/products/`, formdata);
      getProducts(page);
    } catch (error) {
      console.log(error);
    }
  };

  // ! GET ONE PRODUCT
  const getOneProduct = async (id) => {
    try{
      const {data} = await axios(`${API}:8000/api/products/${id}/`)
      console.log(data);
      dispatch({
        type: PRODUCT_ACTIONS.GET_ONE_PRODUCT,
        payload: data
      })
    }catch(error){
      console.log(error);
    }
  }

  // ! EDIT PRODUCT 
  const editProduct = async (id, formData) => {
    try{
      await axios.patch(`${API}:8000/api/products/update/${id}/`, formData)
      getProducts(page)
    }catch(error){
      console.log(error);
    }
  }

  // ! DELETE PRODUCT 
  const deleteProduct = async (id) => {
    try{
      await axios.delete(`${API}:8000/api/products/${id}`)
      getProducts(page)
    }catch(error){
      console.log(error);
    }
  }


  const values = {
    getProducts,
    products: state.products,
    categories: state.categories,
    getCategories,
    addProduct,
    getOneProduct,
    editProduct,
    deleteProduct,
    oneproduct: state.oneproduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
}

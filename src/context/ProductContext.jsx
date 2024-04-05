import React, { createContext, useContext, useReducer, useState } from "react";
import { API, PRODUCT_ACTIONS } from "../consts/const";
import axios from "axios";

const productContext = createContext();
export const useProduct = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  categories: [],
  oneproduct: {},
  searchProduct: {},
  invent: [],
  metal: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case PRODUCT_ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case PRODUCT_ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneproduct: action.payload };
    case PRODUCT_ACTIONS.GET_SEARCH:
      return { ...state, searchProduct: action.payload };
    case PRODUCT_ACTIONS.GET_INVENT:
      return { ...state, invent: action.payload };
    case PRODUCT_ACTIONS.GET_METAL:
      return { ...state, metal: action.payload };
    default:
      return state;
  }
};
export default function ProductContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(4);
  const [inStock, setInStock] = useState("");
  const [search, setSearch] = useState("");

  //! GET ALL PRODUCT
  const getProducts = async () => {
    try {
      const { data } = await axios(
        `${API}:8000/api/products/${window.location.search}`
      );
      dispatch({
        type: PRODUCT_ACTIONS.GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getInvent = async () => {
    try {
      const { data } = await axios(
        `${API}:8000/api/inventory-check/${window.location.search}`
      );
      dispatch({
        type: PRODUCT_ACTIONS.GET_INVENT,
        payload: data,
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
      getProducts(page, limit, category, inStock, search);
    } catch (error) {
      console.log(error);
    }
  };

  // ! GET ONE PRODUCT
  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}:8000/api/products/${id}/`);
      console.log(data);
      dispatch({
        type: PRODUCT_ACTIONS.GET_ONE_PRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! EDIT PRODUCT
  const editProduct = async (id, formData) => {
    try {
      await axios.patch(`${API}:8000/api/products/update/${id}/`, formData);
      getProducts(page, limit, category, inStock, search);
    } catch (error) {
      console.log(error);
    }
  };

  // ! DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}:8000/api/products/${id}`);
      getProducts(page, limit, category, inStock, search);
    } catch (error) {
      console.log(error);
    }
  };

  // ! SEARCH PRODUCT

  const searchedProduct = async (code) => {
    try {
      const { data } = await axios(
        `${API}:8000/api/products/search/?barcode=${code}`
      );
      dispatch({
        type: PRODUCT_ACTIONS.GET_SEARCH,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMetall = async () => {
    try {
      const { data } = await axios(
        `${API}:8000/api/metals/${window.location.search}`
      );
      console.log(data);
      dispatch({
        type: PRODUCT_ACTIONS.GET_METAL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };



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
    searchedProduct,
    searchProduct: state.searchProduct,
    getInvent,
    invent: state.invent,
    getMetall,
    metal: state.metal,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
}

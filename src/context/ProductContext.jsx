import React, { createContext, useContext, useReducer, useState } from "react";
import { API, PRODUCT_ACTIONS } from "../consts/const";
import axios from "axios";

const productContext = createContext();
export const useProduct = () => useContext(productContext);
const INIT_STATE = {
  products: [],
  oneproduct: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case PRODUCT_ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneproduct: action.payload };
    default:
      return state;
  }
};
export default function ProductContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [page, setPage] = useState(1);

  //! GET ALL STAFF
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
  const values = {
    getProducts,
    products: state.products,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
}

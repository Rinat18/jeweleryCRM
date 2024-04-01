import axios from "axios";
import React, { Children, createContext, useContext, useReducer } from "react";
import { API, CASH_LIST, CLIENTS_ACTIONS, token } from "../consts/const";

const cashBox = createContext();
export const useCash = () => useContext(cashBox);

const INIT_STATE = {
  list: [],
  user: [],
  oneUser: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASH_LIST.GET_LIST:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};

export default function CashBoxContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getList = async (page, limit) => {
    try {
      const { data } = await axios(
        `${API}:8000/api/box-office/list/?page=${page}&limit=${limit}`
      );
      dispatch({
        type: CASH_LIST.GET_LIST,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  const values = {
    getList,
    list: state.list
  };
  return <cashBox.Provider value={values}>{children}</cashBox.Provider>;
}

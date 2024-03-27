import React, { createContext, useContext, useReducer, useState } from "react";
import { API, CLIENTS_ACTIONS } from "../consts/const";
import axios from "axios";
const clientContext = createContext();
export const useClient = () => useContext(clientContext);
const INIT_STATE = {
  clients: [],
  oneClient: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CLIENTS_ACTIONS.GET_CLIENTS:
      return { ...state, clients: action.payload };
    case CLIENTS_ACTIONS.GET_ONE_CLIENT:
      return { ...state, oneClient: action.payload };
    default:
      return state;
  }
};

export default function ClientContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [page, setPage] = useState(1);

  //! GET ALL CLIENTS
  const getClients = async (page) => {
    try {
      const { data } = await axios(`${API}:8000/api/clients/?page=${page}`);
      dispatch({
        type: CLIENTS_ACTIONS.GET_CLIENTS,
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! ADD PRODUCT

  const addClient = async (formdata) => {
    try {
      await axios.post(`${API}:8000/api/clients/`, formdata);
      getClients(page);
    } catch (error) {
      console.log(error);
    }
  };

  // ! GET ONE PRODUCT
  const getOneClient = async (id) => {
    try {
      const { data } = await axios(`${API}:8000/api/clients/${id}/`);
      console.log(data);
      dispatch({
        type: CLIENTS_ACTIONS.GET_ONE_CLIENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! EDIT PRODUCT
  const editClient = async (id, formData) => {
    try {
      await axios.patch(`${API}:8000/api/clients/${id}/`, formData);
      getClients(page);
    } catch (error) {
      console.log(error);
    }
  };

  // ! DELETE PRODUCT
  const deleteClient = async (id) => {
    try {
      await axios.delete(`${API}:8000/api/clients/${id}`);
      getClients(page);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    getClients,
    addClient,
    getOneClient,
    editClient,
    deleteClient,
    oneClient: state.oneClient,
    clients: state.clients,

  };
  return (
    <clientContext.Provider value={values}>{children}</clientContext.Provider>
  );
}

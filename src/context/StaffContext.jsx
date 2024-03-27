import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { API, STAFF_ACTIONS } from "../consts/const";
import axios from "axios";
const staffContext = createContext();
export const useStaff = () => useContext(staffContext);

const INIT_STATE = {
  staffs: [],
  staff: [],
  oneStaff: {},
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case STAFF_ACTIONS.GET__STAFFS:
      return { ...state, staffs: action.payload };
    case STAFF_ACTIONS.GET_ONE_STAFF:
      return { ...state, oneStaff: action.payload };
    default:
      return state;
  }
};

export default function StaffContext({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [page, setPage] = useState(1);

  //! GET ALL STAFF
  const getStaffs = async (page,limit) => {
    try {
      const { data } = await axios(`${API}:8000/api/staff/?page=${page}&limit=${limit}`);
      dispatch({
        type: STAFF_ACTIONS.GET__STAFFS,
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! ADD STAFF
  const addStaff = async (formdata) => {
    try {
      await axios.post(`${API}:8000/api/staff/`, formdata);
      getStaffs(page);
    } catch (error) {
      console.log(error);
    }
  };

  //! DELETE STAFF
  const deleteStaff = async (id) => {
    try {
      await axios.delete(`${API}:8000/api/staff/${id}/`);
      getStaffs(page);
    } catch (error) {
      console.log(error);
    }
  };

  // ! GET ONE STAFF
  const getOneStaff = async (id) => {
    try {
      const { data } = await axios(`${API}:8000/api/staff/${id}/`);
      dispatch({
        type: STAFF_ACTIONS.GET_ONE_STAFF,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! EDIT STAFF
  const editStaff = async (id, formData) => {
    try {
      await axios.patch(`${API}:8000/api/staff/${id}/`, formData);
      getStaffs(page);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    getStaffs,
    staffs: state.staffs,
    addStaff,
    deleteStaff,
    editStaff,
    getOneStaff,
    oneStaff: state.oneStaff
  };
  return (
    <staffContext.Provider value={values}>{children}</staffContext.Provider>
  );
}

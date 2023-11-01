import { Get } from "../../config/apiServices";
import useFetch from "../../hooks/useFetch";
import {
  START_FETCH_USER,
  SET_USER_DATA,
  USER_FETCH_FAILED,
  SEARCH_USER,
  SORT_CATEGORY,
  SORT_DATE,
  SORT_ALPHABET,
  NEXT_PAGE,
  PREV_PAGE,
  SORT_PRIORITY,
} from "./types";
import { Dispatch } from "redux";

interface IPayload {
  users?: any;
  errorMsg?: string;
}

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const url = `https://randomuser.me/api/?results=20`;
      dispatch({ type: START_FETCH_USER });
      let payload: IPayload = {};
      const response = await Get(url);
      const { status, data } = response;
      if (status === 200) {
        const result = response.data.results || [];
        payload.users = result;
        return dispatch({ type: SET_USER_DATA, payload });
      } else {
        payload.errorMsg = "failed to fetch data";
        return dispatch({ type: SET_USER_DATA, payload });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: USER_FETCH_FAILED,
          payload: { errorMsg: error.message },
        });
      }
    }
  };
};

export const handleDeleteUser = (id: any) => {
  return (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const users = [...state.users.allUsers];
    let usersLeft = users.filter((user) => id !== user.id);
    dispatch({
      type: SET_USER_DATA,
      payload: { users: usersLeft },
    });
  };
};

export const handleSearchUser = (searchValue: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SEARCH_USER,
      payload: { searchValue },
    });
  };
};
export const handleSortCategory = (activeCategory: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_CATEGORY,
      payload: { activeCategory },
    });
  };
};

export const handleSortAlphabet = (activeOrder: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_ALPHABET,
      payload: { activeOrder },
    });
  };
};
export const handleSortDate = (activeDate: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SORT_DATE,
      payload: { activeDate },
    });
  };
};
export const handlePrevBtn = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: PREV_PAGE,
    });
  };
};
export const handleNextBtn = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: NEXT_PAGE,
    });
  };
};

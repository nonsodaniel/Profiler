import useFetch from "../../hooks/useFetch";
import { saveToLocalStorage } from "../localstorage";
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
      dispatch({ type: START_FETCH_USER });
      const localList = JSON.parse(localStorage.getItem("users")!);
      let payload: IPayload = {};
      if (localList) {
        payload.users = localList;
        return dispatch({ type: SET_USER_DATA, payload });
      } else {
        const url = `myUrl`;
        const response = await useFetch(url);
        const { data, loading, error } = response;
        //  TODO: Handle data computation
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
    saveToLocalStorage("users", usersLeft);
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

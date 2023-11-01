import { Get } from "../../config/apiServices";
import { AppState } from "../reducers/rootReducer";
import { IUserInfo } from "../types";
import {
  START_FETCH_USER,
  SET_USER_DATA,
  USER_FETCH_FAILED,
  SEARCH_USER,
  SORT_GENDER,
  SORT_ALPHABET,
  NEXT_PAGE,
  PREV_PAGE,
} from "./types";
import { Dispatch } from "redux";

interface IPayload {
  users?: IUserInfo;
  errorMsg?: string;
}

// Define action types explicitly
type UserAction =
  | { type: typeof START_FETCH_USER }
  | { type: typeof SET_USER_DATA; payload: IPayload }
  | { type: typeof USER_FETCH_FAILED; payload: { errorMsg: string } }
  | { type: typeof SEARCH_USER; payload: { searchValue: string } }
  | { type: typeof SORT_ALPHABET; payload: { activeOrder: string } }
  | { type: typeof SORT_GENDER; payload: { activeGender: string } }
  | { type: typeof NEXT_PAGE }
  | { type: typeof PREV_PAGE };

type GetUsersAction = (
  pageNumber: number
) => (dispatch: Dispatch<UserAction>) => void;

export const getUsers: GetUsersAction = (pageNumber: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const url = `https://randomuser.me/api/?page=${pageNumber}&results=15`;
      dispatch({ type: START_FETCH_USER });
      let payload: IPayload = {};
      const response = await Get(url);
      const { status } = response;
      if (status === 200) {
        const result = response.data.results || [];
        payload.users = result;
        dispatch({ type: SET_USER_DATA, payload });
      } else {
        payload.errorMsg = "failed to fetch data";
        dispatch({ type: SET_USER_DATA, payload });
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

export const handleSearchUser = (searchValue: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: SEARCH_USER,
      payload: { searchValue },
    });
  };
};
export const handleSortAlphabet = (activeOrder: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: SORT_ALPHABET,
      payload: { activeOrder },
    });
  };
};
export const handleSortGender = (activeGender: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: SORT_GENDER,
      payload: { activeGender },
    });
  };
};

export const handlePrevBtn = () => {
  return (dispatch: Dispatch<UserAction>, getState: () => AppState) => {
    const state = getState();
    const currentPage = state.users.currentPage;
    if (currentPage > 1) {
      dispatch({
        type: PREV_PAGE,
      });
      //@ts-ignore
      dispatch(getUsers(currentPage - 1)); // Dispatch the getUsers action with the updated page number
    }
  };
};

// Action to go to the next page
export const handleNextBtn = () => {
  return (dispatch: Dispatch<UserAction>, getState: () => AppState) => {
    const state = getState();
    const currentPage = state.users.currentPage;
    const totalPages = state.users.totalPages;
    if (currentPage < totalPages) {
      dispatch({
        type: NEXT_PAGE,
      });
      //@ts-ignore
      dispatch(getUsers(currentPage + 1)); // Dispatch the getUsers action with the updated page number
    }
  };
};

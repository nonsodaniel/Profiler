import { combineReducers } from "redux";
import userReducers from "./userReducers";
import { APP_ACTIONS, listReducerState } from "../types";

export type AppState = {
  lists: listReducerState;
};

export type AppActionTypes = APP_ACTIONS;

export const rootReducer = combineReducers({
  lists: userReducers,
});

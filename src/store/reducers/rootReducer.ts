import { combineReducers } from "redux";
import userReducers from "./userReducers";
import { APP_ACTIONS, userReducerState } from "../types";

export type AppState = {
  users: userReducerState;
};

export type AppActionTypes = APP_ACTIONS;

export const rootReducer = combineReducers({
  users: userReducers,
});

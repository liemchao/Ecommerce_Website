import { MenuOpenReducer } from './MenuOpenReducer';
import { combineReducers } from 'redux';
import auth from "./auth";
import message from "./message";

export const Reducers = combineReducers({
  menuState: MenuOpenReducer
});

export default combineReducers({
  auth,
  message,
});
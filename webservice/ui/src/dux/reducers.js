import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// add all reducers
import stats from "./stats";

// combine and export
export default combineReducers( {
  router: routerReducer,
  stats,
} );

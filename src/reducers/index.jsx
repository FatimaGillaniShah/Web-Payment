import groups from "./groups.jsx";
import historyReducer from "./historyReducer.jsx";
import balanceInfo from './balanceInfo.jsx';

import { combineReducers } from "redux";

const index = combineReducers({
  groups, 
  historyReducer,
  balanceInfo

});

export default index;

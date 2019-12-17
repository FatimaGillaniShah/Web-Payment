import groups from "./groups.jsx";
import historyReducer from "./historyReducer.jsx";



import { combineReducers } from "redux";

const index = combineReducers({
  groups, 
  historyReducer,
 


});

export default index;

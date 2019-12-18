import groups from "./groups.jsx";
import historyReducer from "./historyReducer.jsx";
import headerContent from "./headerContent.jsx";
import { combineReducers } from "redux";

const index = combineReducers({
  groups, 
  historyReducer,
  headerContent
});

export default index;

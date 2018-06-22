import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import groupReducer from "./groupReducer";
import errorReducer from "./errorReducer";
import memberReducer from "./memberReducer";

export default combineReducers({
  event: eventReducer,
  group: groupReducer,
  member: memberReducer,
  errors: errorReducer
});

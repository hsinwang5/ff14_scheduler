import { combineReducers } from "redux";
import scheduleReducer from "./scheduleReducer";
import groupReducer from "./groupReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  schedule: scheduleReducer,
  group: groupReducer,
  errors: errorReducer
});

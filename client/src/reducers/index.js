import { combineReducers } from "redux";
import scheduleReducer from "./scheduleReducer";
import groupReducer from "./groupReducer";
import errorReducer from "./errorReducer";
import memberReducer from "./memberReducer";

export default combineReducers({
  schedule: scheduleReducer,
  group: groupReducer,
  member: memberReducer,
  errors: errorReducer
});

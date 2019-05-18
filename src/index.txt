import { combineReducers } from "redux";

// all reducers
import counter from "./counter";
import todos from "./todos";

export default combineReducers({
  counter,
  todos
});

import { combineReducers } from "redux";

// all reducers
import counter from "./counter";
import todos from "./todos";
import products from "./products";

export default combineReducers({
  counter,
  todos,
  products
});

import { combineReducers } from "redux";
import songReducer from "./songReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  songReducer,
  searchReducer,
});

export default rootReducer;

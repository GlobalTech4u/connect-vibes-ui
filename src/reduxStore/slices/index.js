import { combineReducers } from "redux";
import searchReducer from "reduxStore/slices/searchUserSlice";
import usersReducer from "reduxStore/slices/usersSlice";
import authReducer from "reduxStore/slices/authSlice";
import postReducer from "reduxStore/slices/postSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  profile: usersReducer,
  auth: authReducer,
  post: postReducer,
});

export default rootReducer;

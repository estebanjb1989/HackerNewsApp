import { combineReducers } from "redux";
import articlesReducer from "./slices/articles";
import settingsReducer from "./slices/settings";
import permissionsReducer from "./slices/permissions";

export default combineReducers({
  articles: articlesReducer,
  settings: settingsReducer,
  permissions: permissionsReducer,
});

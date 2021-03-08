import { createStore, applyMiddleware, compose } from "redux";
import userReducer from "./reducers/user";
import { createLogger } from "redux-logger";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  userReducer,
  composeEnhancer(applyMiddleware(createLogger()))
);

export default store;

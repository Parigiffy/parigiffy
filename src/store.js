import rootReducer from "./reducer/reducer";

// creating a store
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// adding the combined reducers into the store
// PS: the 2nd argument is just for Redux Devtool Extension, it has nothing to do with the concept
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

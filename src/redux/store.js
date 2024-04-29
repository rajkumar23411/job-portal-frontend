import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { accountReducer, userReducer } from "./reducers/user.reducer";

const reducers = combineReducers({
    auth: userReducer,
    account: accountReducer,
});

const initialStore = {};

const store = createStore(
    reducers,
    initialStore,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

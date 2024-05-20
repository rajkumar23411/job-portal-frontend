import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { accountReducer, userReducer } from "./reducers/user.reducer";
import { companyReducer } from "./reducers/company.reducers";
import { jobsReducer } from "./reducers/job.reducer";
import { bookmarkReducer } from "./reducers/bookmark.reducers";

const reducers = combineReducers({
    auth: userReducer,
    account: accountReducer,
    company: companyReducer,
    jobs: jobsReducer,
    bookmark: bookmarkReducer,
});

const initialStore = {};

const store = createStore(
    reducers,
    initialStore,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

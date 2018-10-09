import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import thunkMiddleware from "redux-thunk";

const defaultReducer = (state = 0, action) => state;
import DatasReducer from "./DatasReducer";

const store = createStore(
    combineReducers({ 
        //defaultReducer,
        DatasReducer
    }),
    applyMiddleware(
        thunkMiddleware
    )
)

let _asyncReducers: {[key:string]:Reducer<any>} = {};

export const injectReducer = (reducer: { [key:string]: Reducer<any> }) => {
    _asyncReducers = { ..._asyncReducers, ...reducer }
    store.replaceReducer(combineReducers(_asyncReducers) as any);
}

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as R from 'ramda';
import createReducer from '../reducers';
import asyncMiddleware from './asyncMiddleware';


export function configureStore(initialState) {
    if (module.hot) {
        module.hot.accept('../reducers/', () => {
            const nextRootReducer = require('../reducers/index').default();
            store.replaceReducer(nextRootReducer);
        });
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(applyMiddleware(thunk), applyMiddleware(asyncMiddleware))
    );


    store.asyncReducers = {};

    store.injectReducer = (path, reducer) => {
        store.asyncReducers = R.assocPath(path, reducer, store.asyncReducers);
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    }

    store.ejectReducer = (path) => {
        store.asyncReducers = R.dissocPath(path, store.asyncReducers);
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    }

    return store;
};

const store = configureStore();

export default store;

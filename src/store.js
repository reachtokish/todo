import allReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(allReducers, applyMiddleware(thunk));
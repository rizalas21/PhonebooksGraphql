import { legacy_createStore } from 'redux'
import { thunk } from 'redux-thunk'
import rootReducers from '../src/reducers'

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
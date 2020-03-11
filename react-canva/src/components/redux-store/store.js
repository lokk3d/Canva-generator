import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'


import { authReducer } from "../authPage/authReducer"
import { appInfoReducer } from "./appInfoReducer"
import { canvasListReducer } from "../homePage/canvaListReducer"
import { canvaReducer } from "../canvas/canvaReducer"

const reducers = combineReducers({
    auth: authReducer,
    appInfo: appInfoReducer,
    canvas: canvasListReducer, //tutte le mie canvas
    canva: canvaReducer//singola canva alla quale sto lavorando ora
})

const middleware = applyMiddleware( thunk, createLogger())

export const store = createStore(reducers, middleware)